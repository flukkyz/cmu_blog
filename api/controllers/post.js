const db = require('../models')
const fs = require('fs')
const { Validator } = require('node-input-validator')
const Op = db.Sequelize.Op
const Post = db.Post
const Img = db.Img
const Comment = db.Comment
const User = db.User

const findByPK = async (id,res,include = []) => {
  const data = await Post.findByPk(id, { include })
  if(data){
    return data
  }
  res.status(404).json({
    message: 'Not Found'
  })
}

module.exports = {
  inputValidate: async (req,res,next) => {
    const v = new Validator(req.body, Post.inputSchema)
    const matched = await v.check()
    if (matched) {
      next()
    }else{
      console.log(v.errors)
      res.status(400).json({
        message: 'Bad request.'+ v.errors
      })
    }
  },
  index: async (req, res, next) => {
    const {
      page,
      size,
      q,
      type
    } = req.query

    var where = {}

    if (q) {
      where = {
        ...where,
        ...{
          [Op.or]: [{
              title: {
                [Op.like]: `%${q}%`
              }
            },
            {
              content: {
                [Op.like]: `%${q}%`
              }
            }
          ]
        }
      }
    }
    if (type) {
      where = {
        ...where,
        ...{
          type
        }
      }
    }
    const {
      limit,
      offset
    } = db.getPagination(page, size)
    try {
      const lists = await Post.findAndCountAll({
        include: [Img, User, Comment],
        where,
        limit,
        offset,
        distinct: true,
        order: [
          ['id', 'desc']
        ]
      })
      res.json(db.getPagingData(lists, page, limit))
    } catch (e) {
      e.message = 'Cannot get data from database.'
      next(e)
    }
  },
  store: async (req, res, next) => {
    var data = req.body
    data.user_id = req.user.id
    try {
      const newData = await db.sequelize.transaction((t) => {
        if (req.file) {
          data.Img = {
            url: req.file.path.replace('static', ''),
            path: req.file.path
          }
        }
        return Post.create(data, {
          include: [Img],
          transaction: t
        })
      })
      res.status(201).json(newData)
    } catch (e) {
      if (req.file) {
        if (fs.existsSync(req.file.path)) {
          fs.unlink(req.file.path, (err) => {
            if (err) {
              console.error(err)
              return
            }
          })
        }
      }
      e.message = 'Cannot store data from database.'
      next(e)
    }
  },
  show: async (req, res, next) => {
    const id = req.params.id
    try {
      const data = await findByPK(id,res,[Img, User])
      res.json(data)
    } catch (e) {
      e.message = 'Cannot get data from database.'
      next(e)
    }
  },
  update: async (req, res, next) => {
    const id = req.params.id
    const data = req.body
    const oldData = await findByPK(id,res)
    if (['admin'].includes(req.user.role) || req.user.id === oldData.user_id) {
      try {
        let oldImg
        await db.sequelize.transaction(async (t) => {
          if (req.file) {
            oldImg = await oldData.getImg()
            const newImg = await Img.create({
              url: req.file.path.replace('static', ''),
              path: req.file.path
            }, {
              transaction: t
            })
            data.img_id = newImg.id
          }
          return Post.update(
            data, {
              where: {
                id
              }
            }, {
              transaction: t
            }
          )
        })
        if (oldImg) {
          oldImg.destroy()
        }
        res.json(data)
      } catch (e) {
        if (req.file) {
          if (fs.existsSync(req.file.path)) {
            fs.unlink(req.file.path, (err) => {
              if (err) {
                console.error(err)
                return
              }
            })
          }
        }
        e.message = 'Cannot update data from database.'
        next(e)
      }
    }else{
      res.status(403).json({
        message: 'Forbidden.'
      })
    }
  },
  destroy: async (req, res, next) => {
    const id = req.params.id
    const oldData = await findByPK(id,res)
    if (['admin'].includes(req.user.role) || req.user.id === oldData.user_id) {
      try {
        await oldData.destroy()
        res.status(204).send()
      } catch (e) {
        e.message = 'Cannot remove data from database.'
        next(e)
      }
    }else{
      res.status(403).json({
        message: 'Forbidden.'
      })
    }
  }
}
