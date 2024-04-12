function connectSSE(){
    let  source = new EventSource('/events');  //替换成你的sse服务端地址
    
    source.onmessage =(event)=>{
        console.log(event.data);
    }


    source.onopen = (event)=>{
        console.log('open:',event);
    }

    source.onerror = (error)=>{
        console.log('error:',error);
    }
  }