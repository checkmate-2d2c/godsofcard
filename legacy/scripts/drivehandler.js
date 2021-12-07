const fs = require('fs');
//const { google } = require('googleapis');
//const Jimp = require("jimp")
//const { Readable } = require('stream');

function bufferToStream(buffer) { 
  var stream = new Readable();
  stream.push(buffer);
  stream.push(null);

  return stream;
}

class driveHandler {
  /*constructor() {
    const TOKEN_PATH = './json/token.json';
    const token = fs.readFileSync(TOKEN_PATH)
    const credentials = JSON.parse(fs.readFileSync("./json/credentials.json"))
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    this.oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    this.card_folderId = '10d5dywVmMF0o8Y-xqVEDRrkqeBQUr0-R';
    this.oAuth2Client.setCredentials(JSON.parse(token));
  }

  listFiles(folder_id) {
    const auth = this.oAuth2Client
    const drive = google.drive({version: 'v3', auth});
    drive.files.list({
      q: "'" + folder_id + "' in parents",
      fields: 'nextPageToken, files(id, name)',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const files = res.data.files;
      if (files.length) {
        console.log('Files:');
        files.map((file) => {
          console.log(`${file.name} (${file.id})`);
        });
      } else {
        console.log('No files found.');
      }
    });
  }*/

  /*dataUrl(file_id, format, cb) {
    console.log(file_id)
    const auth = this.oAuth2Client
    const drive = google.drive({version: 'v3', auth});
    drive.files.get(
      {
        fileId: file_id,
        alt: "media"
      },
      { responseType: "arraybuffer" },
      function(err, { data }) {
        if (err) return cb({status:"error",msg:err})
        cb(`data:image/${format};base64,${Buffer.from(data).toString("base64")}`)
      }
    )
  };*/

  dataUrl(file_id, cb) {
      cb("https://drive.google.com/uc?id=" + file_id)
  };

  getlink(file_id) {
      return "https://drive.google.com/uc?id=" + file_id
  }

  /*upload(buffer, filename, format, cb) {
      const auth = this.oAuth2Client
      const drive = google.drive({version: 'v3', auth});
      var fileMetadata = {
        'name': filename + "." + format,
        parents: [this.card_folderId]
      };
      var media = {
        mimeType: 'image/' + format,
        body: bufferToStream(buffer)
      };
      drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
      }, function (err, file) {
        if (err) {
          // Handle error
          console.error(err);
        } else {
          cb(file.data.id);
        }
      });
  }*/
}

module.exports = {driveHandler}
