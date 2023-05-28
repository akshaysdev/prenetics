const { response } = require('../../../error/response');
const { blogService } = require('../../../service/service');

module.exports = {
  create: async (req, res) => {
    try {
      const response = await blogService.create(req.user, req.body);

      res.status(200).send({ success: true, ...response });
    } catch (error) {
      res.status(error.status || 500).send(response(error));
    }
  },

  update: async (req, res) => {
    try {
      const response = await blogService.update(req.params.id, req.body);

      res.status(200).send({ success: true, ...response });
    } catch (error) {
      res.status(error.status || 500).send(response(error));
    }
  },

  delete: async (req, res) => {
    try {
      const response = await blogService.delete(req.params.id);

      res.status(200).send({ success: true, ...response });
    } catch (error) {
      res.status(error.status || 500).send(response(error));
    }
  },

  read: async (req, res) => {
    try {
      const response = await blogService.read(req.params.id);

      res.status(200).send({ success: true, ...response });
    } catch (error) {
      res.status(error.status || 500).send(response(error));
    }
  },

  readOwned: async (req, res) => {
    try {
      const response = await blogService.readOwned(req.user.id);

      res.status(200).send({ success: true, ...response });
    } catch (error) {
      res.status(error.status || 500).send(response(error));
    }
  },

  readAll: async (req, res) => {
    try {
      const response = await blogService.readAll();

      res.status(200).send({ success: true, ...response });
    } catch (error) {
      res.status(error.status || 500).send(response(error));
    }
  },
};
