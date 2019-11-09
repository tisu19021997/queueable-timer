(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{12:function(e,t,n){e.exports=n(22)},17:function(e,t,n){},18:function(e,t,n){},22:function(e,t,n){"use strict";n.r(t);var a=n(0),u=n.n(a),i=n(9),r=n.n(i),o=(n(17),n(18),n(7)),c=n(2),l=n(3),s=n(5),m=n(4),h=n(1),d=n(6),p=n(10),v=n.n(p),b=n(11),f=function(e){function t(){return Object(c.a)(this,t),Object(s.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return u.a.createElement("li",{key:this.props.id},u.a.createElement("h1",null,this.props.formattedTime))}}]),t}(u.a.Component),g=3600,y=60;function j(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=e;return parseInt(e,10)<10&&t&&(n="0".concat(e).slice(-2)),n}function O(e){return"".concat(j(e.hour)," : ").concat(j(e.minute)," : ").concat(j(e.second))}function E(e){var t=Math.floor(e/y);return{remaining:e-t*y,converted:t}}var k=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(s.a)(this,Object(m.a)(t).call(this,e))).state={queue:[],count:0},n.handleInputChange=n.handleInputChange.bind(Object(h.a)(n)),n.queue=n.queue.bind(Object(h.a)(n)),n.runTimer=n.runTimer.bind(Object(h.a)(n)),n}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidUpdate",value:function(e){var t=this.props.timeRemaining,n=this.state.queue;0!==e.timeRemaining&&0===t&&(this.playSound(),n.length&&this.runTimer())}},{key:"handleInputChange",value:function(e){var t=e.target;this.setState(Object(b.a)({},t.name,t.value))}},{key:"runTimer",value:function(){var e=this.state,t=e.queue,n=e.count,a=this.props.onRun;t.length<=0||(a(t.shift()),this.setState({count:n-1}))}},{key:"queue",value:function(e){e.preventDefault();var t=this.state,n=t.hour,a=void 0===n?0:n,u=t.minute,i=void 0===u?0:u,r=t.second,c=void 0===r?0:r,l=t.count,s=t.queue,m=function(e){var t=parseInt(e.hour,10),n=parseInt(e.minute,10),a=parseInt(e.second,10);return a>=y&&(n=(a=E(a)).converted+n,a=a.remaining),n>=y&&(t=(n=E(n)).converted+t,n=n.remaining),{hour:t,minute:n,second:a}}({hour:a,minute:i,second:c});(a||i||c)&&this.setState({count:l+1,queue:[].concat(Object(o.a)(s),[{id:l,hour:m.hour,minute:m.minute,second:m.second,formattedTime:O(m)}])}),(0,this.props.onQueue)(m,l)}},{key:"playSound",value:function(){this.audio=new Audio("".concat("/queueable-timer","/ting.mp3")),this.audio.play()}},{key:"render",value:function(){var e,t=this,n=this.state.queue;return n.length&&(e=n.map((function(e){return u.a.createElement(f,{key:e.id,formattedTime:e.formattedTime,onRun:t.runTimer})}))),u.a.createElement("div",null,u.a.createElement("form",{onSubmit:this.queue},u.a.createElement("input",{onChange:this.handleInputChange,name:"label",type:"text",placeholder:"label"}),u.a.createElement("input",{onChange:this.handleInputChange,name:"hour",type:"number",placeholder:"hour"}),u.a.createElement("input",{onChange:this.handleInputChange,name:"minute",type:"number",placeholder:"minute"}),u.a.createElement("input",{onChange:this.handleInputChange,name:"second",type:"number",placeholder:"second"}),u.a.createElement("input",{type:"submit",value:"Add to queue"}),u.a.createElement("button",{type:"button",onClick:this.runTimer},"Run")),u.a.createElement("div",{className:"queue"},e))}}]),t}(u.a.Component),I=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(s.a)(this,Object(m.a)(t).call(this,e))).state={time:0,queue:[],timeRemaining:0},n.onRun=n.onRun.bind(Object(h.a)(n)),n.onQueue=n.onQueue.bind(Object(h.a)(n)),n}return Object(d.a)(t,e),Object(l.a)(t,[{key:"onQueue",value:function(e,t){var n=this.state.queue;this.setState({queue:[].concat(Object(o.a)(n),[{id:t,hour:e.hour,minute:e.minute,second:e.second}])})}},{key:"onRun",value:function(e){var t=this,n=e,a=new v.a,u=function(e){return parseInt(e.hour*g,10)+parseInt(e.minute*y,10)+parseInt(e.second,10)}(n);a.enable();var i=setInterval((function(){var e=function(e){var t=0,n=0,a=0;return e>=g&&(t=Math.floor(e/g)),(a=e-t*g)>=y&&(n=Math.floor(a/y)),{hour:t,minute:n,second:a-=n*y}}(u);t.setState({time:O(e),timeRemaining:u}),0===u&&clearInterval(i),u-=1}),1e3)}},{key:"render",value:function(){var e=this.state,t=e.time,n=e.timeRemaining;return u.a.createElement("div",null,u.a.createElement("div",null,u.a.createElement("h1",null,t)),u.a.createElement("div",null,u.a.createElement(k,{onRun:this.onRun,onQueue:this.onQueue,timeRemaining:n})))}}]),t}(u.a.Component);var q=function(){return u.a.createElement("div",{className:"App"},u.a.createElement(I,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(u.a.createElement(q,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[12,1,2]]]);
//# sourceMappingURL=main.35c8fc21.chunk.js.map