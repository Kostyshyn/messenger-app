export default {
  name: 'click-outside',
  directive: {
    bind(el, { expression }, vnode) {
      const fn = vnode.context[expression];
      if (fn) {
        el.stopProp = e => e.stopPropagation();
        el.handler = e => fn(e);
        el.addEventListener('click', el.stopProp);
        document.body.addEventListener('click', el.handler);
      }
    },
    unbind(el, { expression }, vnode) {
      if (vnode.context[expression]) {
        el.removeEventListener('click', el.stopProp);
        document.body.removeEventListener('click', el.handler);
      }
    }
  }
};
