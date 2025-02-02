import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from '@ffmpeg/util';

const fileInput = document.getElementById("fileInput");
const thumbnail = document.getElementById("thumbnail");
const  fileText = document.getElementById("fileText");
const thumbnailInput = document.getElementById("thumbnailInput");

const handleFileUpload = async () => {
try{
    const videoFile = fileInput.files[0]; 
    if (!videoFile) {
        console.error("🚨 No video file selected.");
        return;
      }

    const ffmpeg = new FFmpeg();
    await ffmpeg.load();

    const inputFileName = "input_video.mp4"; 
    const thumbFileName = "thumbnail.jpg"; 

  
    await ffmpeg.writeFile(inputFileName, await fetchFile(videoFile));
    
    await ffmpeg.exec([ "-i", inputFileName, "-ss", "00:00:01", "-frames:v", "1","-vf", "scale=1920:1080", thumbFileName,
    ]);
  
  
    const thumbFile = await ffmpeg.readFile(thumbFileName);
    const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });
    const thumbUrl = URL.createObjectURL(thumbBlob);

    thumbnail.src = thumbUrl;
    /* */
    const thumbFileObject = new File([thumbBlob], "thumbnail.jpg", { type: "image/jpg" });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(thumbFileObject);
    thumbnailInput.files = dataTransfer.files;
    /* */
    await ffmpeg.deleteFile(inputFileName);
    await ffmpeg.deleteFile(thumbFileName);
  
    URL.revokeObjectURL(inputFileName);
    URL.revokeObjectURL(thumbFileName);

    fileText.style.display = "none";
}catch(error){
    console.error("🚨 Error processing video:", error);
}
  
}


fileInput.addEventListener("change", handleFileUpload);
