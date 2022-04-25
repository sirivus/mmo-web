DOMPurify.addHook(
    'beforeSanitizeElements',
    function (currentNode, hookEvent, config) {
      // Do something with the current node and return it
      // You can also mutate hookEvent (i.e. set hookEvent.forceKeepAttr = true)
      return currentNode;
    }
  );