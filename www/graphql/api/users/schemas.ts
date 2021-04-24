import * as nexus from 'nexus';

export const User = nexus.objectType({
  name: 'User',
  definition(t) {
    t.id('id');
    t.json('name');
  },
});

export const BaseViewer = nexus.interfaceType({
  name: 'BaseViewer',
  resolveType() {
    return null;
  },
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('walletAddress');
    t.nonNull.string('email');
    t.nonNull.string('role');
    t.nonNull.string('status');
    t.nonNull.string('plan');
    t.json('name');
    t.json('avatar');
    t.string('bio');
    t.string('shortBio');
    t.string('homepage');
    t.string('location');
    t.nonNull.date('createdAt');
  },
});

export const Viewer = nexus.objectType({
  name: 'Viewer',
  definition(t) {
    t.implements(BaseViewer);
  },
});
