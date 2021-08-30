self.onmessage = (e) => {
  console.log("收到html信息", e.data);
  if (e.data.type == "send") self.postMessage("received");
};
