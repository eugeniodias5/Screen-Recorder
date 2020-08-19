function record(){  
     const videoTitle = "record";
    
     if(navigator.mediaDevices){
            const config = {
                video: true,
                audio: {
                    audioBitsPerSecond: 196608,
                    echoCancellation: true,
                    noiseSuppression: true,
                }
            }
            var video = [];

            navigator.mediaDevices.getDisplayMedia(config)
            .then( stream => {
                var videoRecorder = new MediaRecorder(stream, {mimeType: "video/webm; codecs=vp9" });
                
                console.log("Gravação começou");
                videoRecorder.start();

                document.getElementById('btn-stop-record').addEventListener('click', () => {videoRecorder.stop();})

                videoRecorder.onstop = e => {
                    var blob = new Blob(video, {
                        type: 'video/webm'
                    });
                    var url = URL.createObjectURL(blob);
                    var a = document.createElement('a');
                    document.body.appendChild(a);
                    a.style = 'display: none';
                    a.href = url;
                    a.download = videoTitle + '.webm';
                    a.click();
                    window.URL.revokeObjectURL(url);
                }

                videoRecorder.ondataavailable = e => {
                    video.push(e.data);
                }
            })
            .catch(e => {
                console.log(e);
            });

        }
    }
