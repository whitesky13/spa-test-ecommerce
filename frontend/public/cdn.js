(function (w, d, s, f, o, a, m, ck, sk, md) {

    function setCustomVariable(paramName , defaultValue ){
      var searchParam = window.location.href;
      var searchParamURL = new URL(searchParam);
  
      if(searchParam.includes(paramName) || sessionStorage.getItem(paramName) !== null){
        var paramValue = searchParamURL.searchParams.get(paramName)
        if(!searchParam.includes(paramName)){
          paramValue = sessionStorage.getItem(paramName)
        }
        if(paramValue === "null"){
          if(sessionStorage.getItem(paramName) !== null){
            sessionStorage.removeItem(paramName)
          }
          return defaultValue;
        } else{
          if(searchParam.includes(paramName)){
            sessionStorage.setItem(paramName,paramValue);
          }
        }
        return paramValue;
      } else {
        return defaultValue;
      }
    }
  
    var defaultck;
    var defaultsk;
    w["SmartechObject"] = o;
    w[o] =
      w[o] ||
      function (a, c, n) {
        if (a === "create") {
          defaultck = c;
          //To Check for smtclientid (Client ID)
          c = setCustomVariable("smtclientid",defaultck);
          ck = c;
          sessionStorage.setItem("ck", c);
          sessionStorage.setItem("__smtidc", (n || "").toLowerCase());
          checkLoad();
          return;
        }
        if (a === "register") {
          defaultsk = c;
          //To Check for smtsiteid (Site ID)
          c = setCustomVariable("smtsiteid",defaultsk);
          sk = c;
          localStorage.setItem("__stsiteid", c);
          checkLoad();
          return;
        }
        (w[o].q = w[o].q || []).push(arguments);
      };
    var config = localStorage.getItem("__stconfig") || null;
    if (config) {
      var cnfg = JSON.parse(config),
        expd = new Date(cnfg.exd);
      if (expd > new Date()) {
        if (cnfg.ps === "0" || cnfg.js === "0") {
          console.log("Js blocked.");
          return;
        }
      } else {
        localStorage.removeItem("__stconfig");
      }
    }
    function checkLoad(v) {
      if (ck && sk) {
        md = sessionStorage.getItem("__stmd");
        if (!["l", "s", "demo", "dev"].includes(md)) {
          md = Math.random();
          md = md > 0.95 ? "l" : "s";
          sessionStorage.setItem("__stmd", md);
        }
        loadSt(md);
      }
    }
  
    function loadSt(rc) {
  
      a = d.createElement(s);
      m = d.getElementsByTagName(s)[0];
      a.async = 1;
      let queryParam = "?clientkey=" + ck + "&siteid=" + sk + "&rc=" + rc;
  
  
      //To check for smtenv (Environment Setting)
      const envUrl = setCustomVariable("smtenv","v1/dev0/js-versioning");
     
      //To check for smtdomain (Sub-Domain Setting)
      f = "//"+setCustomVariable("smtdomain","osjs");
  
      //To check for smtport (Port Number)
      var port = setCustomVariable('smtport',"");
  
      if(port.length > 0){
        port = ":" + port;
      }
  
      a.src = "https:" + f + ".netcoresmartech.com"+port+"/" + envUrl + queryParam;
      a.id = "smartech_v4";
      var smt = document.getElementById(a.id);
      if (!smt) {
        m.parentNode.insertBefore(a, m);
      }
    }
  })(
    window,
    document,
    "script",
    "//osjs.netcoresmartech.com/",
    "smartech"
  );