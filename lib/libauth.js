export class libauth
  {
    constructor()
      {
        //public vars for use in functions
        this.INIT_FLAG=0
        
        //auth properties
        this.pRSA=null;
        this.hash=null;
        this.user=null;
        
        this.location="https://auth.sexycoders.org/libauth";

        //flags
        this.REDIRECT_FLAG=0;
        
        //temp storage for stuff
        //dont use in functions
        this._enc_prsa=null;
        this._rsa=null;

        //flags
        this.KEY_SET=0;
      }
  }

//import forge from 'node-forge';
//export function unlock_libauth()
  //{
    //var data=new Object();
    //data.password=($('form').serializeArray()[0].value);

    //var encrypted_ssh=atob(window.__auth__._enc_prsa);

    //var t=new Object();
    //t.md = forge.md.md5.create();
    //t.md.update(data.password);
    //var decipher = forge.cipher.createDecipher('AES-CBC',t.md.digest().toHex());
    //delete t.md;

    //t.md = forge.md.sha256.create();
    //t.md.update(data.password);
    //decipher.start({iv: t.md.digest().toHex().substring(0,16)});
    //decipher.update(forge.util.createBuffer(encrypted_ssh));
    //decipher.finish();
    //var decrypted = decipher.output;

    //window.__auth__.setpRSA(decipher.output.bytes());

    //console.log(decrypted);
    //delete t.md;

    //handshake(window.__auth__);
  //}
