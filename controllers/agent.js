'use strict';

module.exports = {
  async index(req, res) {
    const {realmq} = req.app.locals;

    const channelList = await realmq.channels.list();

    res.render('agent/index', {
      channelList,
    });
  },
};
