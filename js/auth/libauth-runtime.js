//import $ from "jquery";
//export default function init(){

  //window.__sexy_coders__=true;
  //window.__SCD=new Object();
  //window.__SCD.datacenter="https://data.sexycoders.org";
  
  //var urlParams = new URLSearchParams(window.location.search);
  //if(urlParams.has("__auth_move"))
    //{
      //window.__auth_system=new AuthSystem();
      //window.__SCD.user=JSON.parse(atob(urlParams.get("__auth_move")));
      //window.__auth_system.user=window.__SCD.user;
      //window.__libauth__=true;

      //var tt=new Object();
      //tt.email=window.__SCD.user;

      //retrieve_key(tt);

      //var t_forge=document.createElement("script");
      //t_forge.setAttribute("src",window.__auth_system.auth_server_domain+"/node_modules/node-forge/dist/forge.min.js");
      //document.body.appendChild(t_forge);
      //if (typeof jQuery == 'undefined') 
        //{
            ////jQuery IS NOT loaded, do stuff here.
          //var t_jquery=document.createElement("script");
          //t_jquery.setAttribute("src",window.__auth_system.auth_server_domain+"/node_modules/jquery/dist/jquery.min.js");
          //document.body.appendChild(t_jquery);
        //}
    //}
  //}

//window.addEventListener("load",init());

//export function Sign(data,key)
  //{
    //var pki = forge.pki;
    //var pKey = pki.privateKeyFromPem(key);

    //var md = forge.md.sha256.create();
    //md.update(data,'utf8');
  //return pKey.sign(md);
  //}

//export function POST(system,post_data)
  //{
    //var seed=Math.floor(Math.random()*1000000000)+1;
    ////var signature=Sign(seed,user.rsa);
    //var signature=Sign(seed,system.pRSA);

    //var json_send=new Object();
    //json_send.command="message";
    //json_send.user=new Object();
    //json_send.user.id=system.user;
    //json_send.user.seed=seed;
    //json_send.user.sign=btoa(signature);

    //var t=new Object();
    //t.md = forge.md.md5.create();
    //t.md.update(system.hash);
    //var IV=t.md.digest().bytes();
    //delete t.md;

    //t.md = forge.md.sha256.create();
    //t.md.update(system.hash);
    //var cipher = forge.cipher.createCipher('AES-CBC',t.md.digest().bytes());
    //cipher.start({iv:IV});
    //cipher.update(forge.util.createBuffer(JSON.stringify(post_data)));
    //cipher.finish();
    //delete t.md;

    //json_send.data=btoa(cipher.output.bytes());
    //console.log("Json Is: "+JSON.stringify(json_send));
    //var to_return;
    //var send=btoa(JSON.stringify(json_send));
        //$.ajax({
            //type: 'POST',
            //headers: {"Access-Control-Allow-Origin":"localhost:56083"},
            //url: window.__auth_system.auth_server,
            //data: send,
            //success:
            //function(response)
                //{
                    //var data=JSON.parse(atob(response));

                    //var T=new Object();
                    //T.md = forge.md.md5.create();
                    //T.md.update(system.hash);
                    //var IV=T.md.digest().bytes();
                    //delete T.md;

                    //T.md = forge.md.sha256.create();
                    //T.md.update(system.hash);
                    //var cipher = forge.cipher.createDecipher('AES-CBC',T.md.digest().bytes());
                    //cipher.start({iv:IV});

                    //cipher.update(forge.util.createBuffer(atob(data.data)));
                    //cipher.finish();
                    //delete T.md;

                    //to_return=JSON.parse(cipher.output.bytes());
                //},
            //async:false
            //});
    //return to_return;
  //}

//export function MOVE(location,param,cors_flag)
  //{
    //if(cors_flag)
      //cors_flag=0;
    //else
      //{
        //var t=window.__auth_system;
        //t.pRSA="FORBIDEN";
        //t=btoa(JSON.stringify(t.user));

        //t=new URLSearchParams(t).toString()

        //var dest=location+"?__auth_move="+t;

        //if(param)
          //window.open(dest);
        //else
          //window.location.replace(dest);
      //}

  //}

//export function handshake(system)
  //{
    //var seed=Math.floor(Math.random()*1000000000)+1;
    ////var signature=Sign(seed,user.rsa);
    //var signature=Sign(seed,system.pRSA);

    //var json_send=new Object();
    //json_send.command="request_handshake";
    //json_send.user=new Object();
    //json_send.user.id=system.user;
    //json_send.user.seed=seed;
    //json_send.user.sign=btoa(signature);

    //console.log("Json Is: "+JSON.stringify(json_send));
    //var send=btoa(JSON.stringify(json_send));
        //$.ajax({
            //type: 'POST',
            //headers: {"Access-Control-Allow-Origin":"localhost:56083"},
            //url: window.__auth_system.auth_server,
            //data: send,
            //success:
            //function(response)
                //{
                    //var data=JSON.parse(atob(response));
                    //console.log("server response: "+JSON.stringify(data));
                    //if(data.message=="connection_refused")
                      //{
                        //MOVE(system.auth_page,false);
                        //return 1;
                      //}
                    //var privateKey=forge.pki.privateKeyFromPem(system.pRSA);
                    //var decrypted = privateKey.decrypt(atob(data.hash),"RSAES-PKCS1-V1_5");
                    //system.hash=decrypted;
                    //console.log(decrypted);
                //},
            //async:false
            //});

            //window.__auth_flag=1;
            //var t=new Event("HASH_RECEIVED_SIG");
            //window.dispatchEvent(t);
  //}
//export function retrieve_key(data)
  //{
    //var json_send=new Object();
    //json_send.command="request_private";
    //json_send.user=new Object();
    //json_send.user.id=data.email;
    //var send=btoa(JSON.stringify(json_send));
        //$.ajax({
            //type: 'POST',
            //headers: {"Access-Control-Allow-Origin":"http://auth-serve.localhost"},
            //url: window.__auth_system.auth_server,
            //data: send,
            //success:
            //function(response)
                //{
                  //console.log("server response: "+atob(response));
                  //var res=JSON.parse(atob(response));
                  //window.__auth_system.set_enc_prsa(res.pRSA);
                  //window.__auth_system.KEY_SET=1;
                //},
            //async:false
            //});
  //}

