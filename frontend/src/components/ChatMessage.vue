<template>
  <div class="messages chat" id="chat">
    <div class="time">Today at 11:41</div>
    <div class="message parker">Hey, man! What's up, Mr Stark? 👋</div>
    <div class="message stark">Kid, where'd you come from?</div>
    <div class="message parker">Field trip! 🤣</div>
    <div class="message parker">
      Uh, what is this guy's problem, Mr. Stark? 🤔
    </div>
    <div class="message stark">
      Uh, he's from space, he came here to steal a necklace from a wizard.
    </div>
    <div class="message stark">
      <div class="typing typing-1"></div>
      <div class="typing typing-2"></div>
      <div class="typing typing-3"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.chat .messages {
  padding: 1rem;
  background: #f7f7f7;
  flex-shrink: 2;
  overflow-y: auto;
  box-shadow: inset 0 2rem 2rem -2rem rgba(0, 0, 0, 0.05),
    inset 0 -2rem 2rem -2rem rgba(0, 0, 0, 0.05);
}
.chat .messages .time {
  font-size: 0.8rem;
  background: #eee;
  padding: 0.25rem 1rem;
  border-radius: 2rem;
  color: #999;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  margin: 0 auto;
}
.chat .messages .message {
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  margin: 1rem;
  background: #fff;
  border-radius: 1.125rem 1.125rem 1.125rem 0;
  min-height: 2.25rem;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  max-width: 66%;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.075),
    0rem 1rem 1rem -1rem rgba(0, 0, 0, 0.1);
}
.chat .messages .message.parker {
  margin: 1rem 1rem 1rem auto;
  border-radius: 1.125rem 1.125rem 0 1.125rem;
  background: #2d3748;
  color: white;
}
.chat .messages .message .typing {
  display: inline-block;
  width: 0.8rem;
  height: 0.8rem;
  margin-right: 0rem;
  box-sizing: border-box;
  background: #ccc;
  border-radius: 50%;
}
.chat .messages .message .typing.typing-1 {
  -webkit-animation: typing 3s infinite;
  animation: typing 3s infinite;
}
.chat .messages .message .typing.typing-2 {
  -webkit-animation: typing 3s 250ms infinite;
  animation: typing 3s 250ms infinite;
}
.chat .messages .message .typing.typing-3 {
  -webkit-animation: typing 3s 500ms infinite;
  animation: typing 3s 500ms infinite;
}
.chat {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 20rem;
  height: 30rem;
  z-index: 2;
  box-sizing: border-box;
  border-radius: 1rem;
  background: white;
  box-shadow: 0 0 8rem 0 rgba(0, 0, 0, 0.1),
    0rem 2rem 4rem -3rem rgba(0, 0, 0, 0.5);
}
</style>