import $ from "jquery";

export function Sign(data,key)
  {
    var pki = forge.pki;
    var pKey = pki.privateKeyFromPem(key);

    var md = forge.md.sha256.create();
    md.update(data,'utf8');
  return pKey.sign(md);
  }

export function POST(system,post_data)
  {
    var seed=Math.floor(Math.random()*1000000000)+1;
    //var signature=Sign(seed,user.rsa);
    var signature=Sign(seed,system.pRSA);

    var json_send=new Object();
    json_send.command="message";
    json_send.user=new Object();
    json_send.user.id=system.user;
    json_send.user.seed=seed;
    json_send.user.sign=btoa(signature);

    var t=new Object();
    t.md = forge.md.md5.create();
    t.md.update(system.hash);
    var IV=t.md.digest().bytes();
    delete t.md;

    t.md = forge.md.sha256.create();
    t.md.update(system.hash);
    var cipher = forge.cipher.createCipher('AES-CBC',t.md.digest().bytes());
    cipher.start({iv:IV});
    cipher.update(forge.util.createBuffer(JSON.stringify(post_data)));
    cipher.finish();
    delete t.md;

    json_send.data=btoa(cipher.output.bytes());
    console.log("Json Is: "+JSON.stringify(json_send));
    var to_return;
    var send=btoa(JSON.stringify(json_send));
        $.ajax({
            type: 'POST',
            headers: {"Access-Control-Allow-Origin":"localhost:56083"},
            url: window.__auth_system.auth_server,
            data: send,
            success:
            function(response)
                {
                    var data=JSON.parse(atob(response));

                    var T=new Object();
                    T.md = forge.md.md5.create();
                    T.md.update(system.hash);
                    var IV=T.md.digest().bytes();
                    delete T.md;

                    T.md = forge.md.sha256.create();
                    T.md.update(system.hash);
                    var cipher = forge.cipher.createDecipher('AES-CBC',T.md.digest().bytes());
                    cipher.start({iv:IV});

                    cipher.update(forge.util.createBuffer(atob(data.data)));
                    cipher.finish();
                    delete T.md;

                    to_return=JSON.parse(cipher.output.bytes());
                },
            async:false
            });
    return to_return;
  }

export function MOVE(location,param,cors_flag)
  {
    if(cors_flag)
      cors_flag=0;
    else
      {
        var t=window.__auth_system;
        t.pRSA="FORBIDEN";
        t=btoa(JSON.stringify(t.user));

        t=new URLSearchParams(t).toString()

        var dest=location+"?__auth_move="+t;

        if(param)
          window.open(dest);
        else
          window.location.replace(dest);
      }

  }

export function handshake(system)
  {
    var seed=Math.floor(Math.random()*1000000000)+1;
    //var signature=Sign(seed,user.rsa);
    var signature=Sign(seed,system.pRSA);

    var json_send=new Object();
    json_send.command="request_handshake";
    json_send.user=new Object();
    json_send.user.id=system.user;
    json_send.user.seed=seed;
    json_send.user.sign=btoa(signature);

    console.log("Json Is: "+JSON.stringify(json_send));
    var send=btoa(JSON.stringify(json_send));
        $.ajax({
            type: 'POST',
            headers: {"Access-Control-Allow-Origin":"localhost:56083"},
            url: window.__auth_system.auth_server,
            data: send,
            success:
            function(response)
                {
                    var data=JSON.parse(atob(response));
                    console.log("server response: "+JSON.stringify(data));
                    if(data.message=="connection_refused")
                      {
                        MOVE(system.auth_page,false);
                        return 1;
                      }
                    var privateKey=forge.pki.privateKeyFromPem(system.pRSA);
                    var decrypted = privateKey.decrypt(atob(data.hash),"RSAES-PKCS1-V1_5");
                    system.hash=decrypted;
                    console.log(decrypted);
                },
            async:false
            });

            window.__auth_flag=1;
            var t=new Event("HASH_RECEIVED_SIG");
            window.dispatchEvent(t);
  }

export class oauth2
  {
    constructor()
      {
        this.token=null;
      }
  }

export class AuthSystem
  {
    constructor()
      {
        this.oauth2=new oauth2();

        //public vars for use in functions
        this.INIT_FLAG=0
        
        //auth properties
        this.pRSA=null;
        this.hash=null;
        this.user=null;
        
        //general properties
        this.site=new Object();
        this.site.location=window.location.href;
        this.site.protocol=window.location.protocol;
        this.site.domain=window.document.domain;
        this.site.port=window.location.port;
        this.site.parent=null;
        this.site.home="https://uniclient.sexycoders.org";
        this.site.auth_server_domain="https://auth.sexycoders.org";
        this.site.auth_page=this.auth_server_domain+"/login.html"
        this.site.auth_domain="https://auth.sexycoders.org";

        //oauth2 system info
        this.site.oauth2=new Object();
        this.site.oauth2.location="https://oauth2.sexycoders.org";
        this.site.oauth2.token=this.site.oauth2.location+"/token.php";
        this.site.oauth2.validate=this.site.oauth2.location+"/validate.php";
        this.site.auth_libauth=this.auth_domain+"/libauth";

        //flags
        this.REDIRECT_FLAG=0;
        
        //temp storage for stuff
        //dont use in functions
        this._enc_prsa=null;
        this._rsa=null;

        //flags
        this.KEY_SET=0;

      }
      //functions
      setpRSA(T)
        {
          this.pRSA=T;
        }
      setHash(T)
        {
          this.hash=T;
        }
      setUser(T)
        {
          this.user=T;
        }
      setDomain(T)
        {
          this.domain=T;
        }
      setDomainLocation(T)
        {
          this.domain_location=T;
        }
      setParent(T)
        {
          this.parent=T;
        }
      setAuthServer(T)
        {
          this.auth_server=T;
        }
      set_enc_prsa(T)
        {
          this._enc_prsa=T;
          this.KEY_SET=1;
        }
  }

export function retrieve_key(data)
  {
    var json_send=new Object();
    json_send.command="request_private";
    json_send.user=new Object();
    json_send.user.id=data.email;
    var send=btoa(JSON.stringify(json_send));
        $.ajax({
            type: 'POST',
            headers: {"Access-Control-Allow-Origin":"http://auth-serve.localhost"},
            url: window.__auth_system.auth_server,
            data: send,
            success:
            function(response)
                {
                  console.log("server response: "+atob(response));
                  var res=JSON.parse(atob(response));
                  window.__auth_system.set_enc_prsa(res.pRSA);
                  window.__auth_system.KEY_SET=1;
                },
            async:false
            });
  }


export default function init(){

  window.__sexy_coders__=true;
  window.__SCD=new Object();
  window.__SCD.datacenter="http://data.localhost";
  
  var urlParams = new URLSearchParams(window.location.search);
  if(urlParams.has("__auth_move"))
    {
      window.__auth_system=new AuthSystem();
      window.__SCD.user=JSON.parse(atob(urlParams.get("__auth_move")));
      window.__auth_system.user=window.__SCD.user;
      window.__libauth__=true;

      var tt=new Object();
      tt.email=window.__SCD.user;

      retrieve_key(tt);

      var t_forge=document.createElement("script");
      t_forge.setAttribute("src",window.__auth_system.auth_server_domain+"/node_modules/node-forge/dist/forge.min.js");
      document.body.appendChild(t_forge);
      if (typeof jQuery == 'undefined') 
        {
            //jQuery IS NOT loaded, do stuff here.
          var t_jquery=document.createElement("script");
          t_jquery.setAttribute("src",window.__auth_system.auth_server_domain+"/node_modules/jquery/dist/jquery.min.js");
          document.body.appendChild(t_jquery);
        }
    }
  }

window.addEventListener("load",init());
import forge from 'node-forge';
export function unlock_oauth2()
  {
    var data=new Object();
    data.username=($('form').serializeArray()[0].value);
    data.password=($('form').serializeArray()[1].value);
    data.grant_type='password';
    data.command='token';
    if(window.__auth_system==undefined)
      window.__auth_system=new AuthSystem();
    //var send=JSON.stringify(data);
    $.ajax({
        type: 'POST',
        url: window.__auth_system.site.oauth2.token,
      headers: {"Access-Control-Allow-Origin":"http://test.uniclient.localhost:8088"},
        data: "grant_type=client_credentials&client_id="+data.username+
            "&client_secret="+data.password,
        success:
        function(response)
            {
                console.log(response);
                var data=response;
                if(data.access_token!=undefined)
                  {
                    window.__auth_flag=1;
                    window.__auth_system.oauth2.token=data.access_token;
                    localStorage.setItem("oauth2_token",data.access_token);
                    var t=new Event("HASH_RECEIVED_SIG");
                    window.dispatchEvent(t);
                  }
            },
        async:false
        });
  }

export function unlock_libauth()
  {
    var data=new Object();
    data.password=($('form').serializeArray()[0].value);

    var encrypted_ssh=atob(window.__auth_system._enc_prsa);

    var t=new Object();
    t.md = forge.md.md5.create();
    t.md.update(data.password);
    var decipher = forge.cipher.createDecipher('AES-CBC',t.md.digest().toHex());
    delete t.md;

    t.md = forge.md.sha256.create();
    t.md.update(data.password);
    decipher.start({iv: t.md.digest().toHex().substring(0,16)});
    decipher.update(forge.util.createBuffer(encrypted_ssh));
    decipher.finish();
    var decrypted = decipher.output;

    window.__auth_system.setpRSA(decipher.output.bytes());

    console.log(decrypted);
    delete t.md;

    handshake(window.__auth_system);
  }
