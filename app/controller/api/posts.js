'use strict';

const Controller = require('egg').Controller;

const queryRule = {
  pageIndex: {
    // 页码
    type: 'int',
    convertType: 'int',
    default: 1,
    required: true,
  },
  pageSize: {
    // 一页数据量
    type: 'int',
    convertType: 'int',
    default: 10,
    required: true,
  },
  type: {
    // 帖子类型，1讨论帖，2树洞，3找对象，4求职区
    type: 'enum',
    convertType: 'int',
    required: true,
    default: 1,
    values: [ 1, 2, 3, 4 ],
  },
  order: {
    // 排序方式，1最新发表，2最新回复，3热门贴，4精华帖 （不适用于树洞）
    type: 'int',
    convertType: 'int',
    default: 1,
    required: false,
  },
};
class Posts extends Controller {
  // 获取总的帖子
  async index() {
    const { ctx } = this;
    ctx.validate(queryRule, ctx.query); // 参数校验
    const { pageIndex, pageSize, type, order } = ctx.query;
    let result = { count: 0, posts: [] };
    let checked = 0;
    if (type === 4) {
      // 获取审核过的帖子，求职区的帖子需要经过审核才能展示
      checked = 1;
    }
    if (order === 1) {
      // 查询最新发表的帖子
      result = await ctx.service.posts.getLatestPost(pageIndex, pageSize, type, checked);
    } else if (order === 2) {
      // 查询最新发表的帖子，暂时这样，还未完成
      result = await ctx.service.posts.getLatestPost(pageIndex, pageSize, type, checked);
    } else if (order === 3) {
      // 查询最新发表的帖子，暂时这样，还未完成
      result = await ctx.service.posts.getLatestPost(pageIndex, pageSize, type, checked);
    } else {
      result = await ctx.service.posts.getHighlightPost(pageIndex, pageSize, type, checked);
    }
    ctx.helper.$success(result);
  }

  // 查找帖子
  async show() {
    const { ctx } = this;
    const id = ctx.helper.toInt(ctx.params.id);
    const post = await ctx.service.posts.findById(id);
    const userInfo = await ctx.service.userInfos.findById(post.userId);
    post.setDataValue('userInfo', userInfo.get({ plain: true })); // 给每条帖子数据添加作者信息
    ctx.helper.$success(post);
  }

  // 创建帖子
  async create() {
    const { ctx } = this;
    ctx.validate(
      {
        title: {
          type: 'string',
          required: false,
          max: 40,
        },
        content: {
          type: 'string',
          required: true,
        },
        type: {
          type: 'enum',
          default: 1,
          values: [ 1, 2, 3, 4 ],
          required: false,
        },
        tags: {
          type: 'array',
          required: false,
          default: [],
        },
      },
      ctx.request.body
    );
    const user = await ctx.service.userInfos.findOne(ctx.user_email);
    const newPost = {};
    Object.assign(newPost, ctx.request.body, { userId: user.id });
    const post = await ctx.service.posts.create(newPost);
    ctx.helper.$success(post);
  }

  // 更新帖子
  async update() {
    const { ctx } = this;
    ctx.validate(
      {
        title: {
          type: 'string',
          required: false,
          max: 40,
        },
        content: {
          type: 'string',
          required: false,
        },
        type: {
          type: 'enum',
          values: [ 1, 2, 3, 4 ],
          required: false,
        },
        tags: {
          type: 'array',
          required: false,
        },
        checked: {
          type: 'enum',
          values: [ 1, 0 ],
          required: false,
        },
      },
      ctx.request.body
    );
    const id = ctx.helper.toInt(ctx.params.id);
    const post = await ctx.service.posts.findById(id);
    if (!post) {
      const { POST_NOT_FOUND } = this.config.errors;
      ctx.helper.$fail(POST_NOT_FOUND.code, POST_NOT_FOUND.msg);
      return;
    }
    // 判断用户是否有权进行此操作
    const user = await ctx.service.userInfos.findOne(ctx.user_email);
    if (user.id !== post.userId) {
      const { NO_RIGHTS_OPERATION } = this.config.errors;
      ctx.helper.$fail(NO_RIGHTS_OPERATION.code, NO_RIGHTS_OPERATION.msg);
      return;
    }
    await post.update(ctx.request.body);
    ctx.helper.$success(post);
  }

  // 审核帖子
  async setPostChecked() {
    const { ctx } = this;
    ctx.validate(
      {
        id: {
          type: 'int',
          convertType: 'int',
          required: true,
        },
        checked: {
          type: 'enum',
          convertType: 'int',
          values: [ 1, 0 ],
          required: true,
        },
      },
      ctx.request.body
    );
    const { id, checked } = ctx.request.body;
    const post = await ctx.service.posts.findById(id);
    if (!post) {
      const { POST_NOT_FOUND } = this.config.errors;
      ctx.helper.$fail(POST_NOT_FOUND.code, POST_NOT_FOUND.msg);
      return;
    }
    // 只有管理员有权进行此操作
    const user = await ctx.service.userInfos.findOne(ctx.user_email);
    if (user.role < 5) {
      const { NO_RIGHTS_OPERATION } = this.config.errors;
      ctx.helper.$fail(NO_RIGHTS_OPERATION.code, NO_RIGHTS_OPERATION.msg);
      return;
    }
    await post.update({ checked });
    ctx.helper.$success(post);
  }

  // 删除帖子
  async destroy() {
    const { ctx } = this;
    const id = ctx.helper.toInt(ctx.params.id);
    const post = await ctx.service.posts.findById(id);
    if (!post) {
      const { POST_NOT_FOUND } = this.config.errors;
      ctx.helper.$fail(POST_NOT_FOUND.code, POST_NOT_FOUND.msg);
      return;
    }
    // 判断用户是否有权进行此操作
    const user = await ctx.service.userInfos.findOne(ctx.user_email);
    if (user.id !== post.userId) {
      const { NO_RIGHTS_OPERATION } = this.config.errors;
      ctx.helper.$fail(NO_RIGHTS_OPERATION.code, NO_RIGHTS_OPERATION.msg);
      return;
    }
    await post.destroy();
    ctx.helper.$success();
  }
}
module.exports = Posts;
