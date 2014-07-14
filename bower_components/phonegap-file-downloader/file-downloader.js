var app = {
    failureTally: 0,
    rootdir: ''
};

function filetransfer(download_link,fp) {
    var fileTransfer = new FileTransfer();
    fileTransfer.download(
        download_link,
        fp,
        function(entry) {
            console.log("download complete: " + entry.fullPath);
        },
        function(error) {
            console.log("download error source " + error.source);
            app.failureTally++;
            console.log(app.failureTally);
        }
    );
}

var Downloader = function Downloader() {
    this.download_links = [
        "http://techslides.com/demos/sample-videos/small.mp4",
        "http://techslides.com/demos/sample-videos/small.mp4",
        "http://techslides.com/demos/sample-videos/small.mp4"
    ];
    this.className = "Downloader";
};

Downloader.prototype = {
     
    getFileSystem: function() {
        document.addEventListener('deviceready', function() {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);
        function fileSystemSuccess(fileSystem) {
            app.rootdir = fileSystem.root.toURL();
        }
        function fileSystemFail(evt) {
            //Unable to access file system
            alert(evt.target.error.code);
        }
      });
    },

    test: function() {
        return "test";
    },

    download: function() {
        // the order that these links are listed is the order that corresponds to the content.
        // e.g. the first link in this array will correspond to the string 'video01' in the content.
        var dl = new Downloader();
        var download_links = dl.download_links;
        var numDownloads = download_links.length;
        fp = [];
        for (var i = 0; i < numDownloads; i++) {
            ext = download_links[i].substr(download_links[i].lastIndexOf('.') + 1);

            fp.push(app.rootdir + "downloaded_video" + i + "." + ext); // file path and name
            localStorage.setItem('fp',JSON.stringify(fp));

            // call file transfer function
            filetransfer(download_links[i], fp[i]);
        }

        setTimeout(function() {
            if (app.failureTally === 0) {
                alert("Download Complete!");
            }
            else {
                alert("Something went wrong with the download and people have been notified.");
            }
            app.failureTally = 0;
        }, 500);
    },

    findInstances: function(fileType,content) {
        // global variable for use with insert function
        elements = [];

        // currently supported file types: video, audio and should appear with the file type and id numbers following
        // e.g. video1, audio2, video52, audio12, etc.
        var reg = new RegExp(fileType+"[0-9]{1,2}","g");
        var found = String(content.match(reg));

        elements.push(found);
        elements = elements[0].split(',');
        return elements;

    },

    insert: function(fileType,content) {
        elemNums = [], elemNew = [];
        for (i = 0; i < elements.length; i++) {
            // access local storage if files have already been downloaded
            if (typeof localStorage.fp === 'undefined') {
                alert("Please download the most recent content.");
                return content;
            }
            else {
                fp = JSON.parse(localStorage.fp);
            }
            // create an array of the ID numbers
            var elemId = new RegExp(fileType+"(.*)");
            elemNums.push(elements[i].match(elemId)[1]);

            // create the corresponding video tag, referencing the index number of the file path array
            var elemTag;
            var fileSrc = fp[parseFloat(elemNums[i])];
                if (fileType === "video") {
                    elemTag = "<video controls style='max-width:100%;'><source type='video/mp4' src='"+fileSrc+"'/></video>";
                }
                else if (fileType === "audio") {
                    elemTag = "<audio controls style='max-width:100%;'><source type='audio/mpeg' src='"+fileSrc+"'/></audio>";
                }
                else {
                    alert("That file type is not currently supported.");
                    return content;
                }
            elemNew.push(elemTag);
            if (elemNew[i].indexOf("undefined") === -1) {
                content = content.replace(elements[i],elemNew[i]);
            }
            else {
                content = content.replace(elements[i],"<p>This video is unavailable.</p>");
            }
        }
        return content;
    }
}
