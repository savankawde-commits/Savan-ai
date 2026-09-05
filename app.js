const $=id=>document.getElementById(id);
const apiInput=$("api"), chat=$("chat"), status=$("status"), mic=$("mic");
let key=localStorage.getItem("savan_api_key")||"";
apiInput.value=key;

$("save").onclick=()=>{key=apiInput.value.trim(); localStorage.setItem("savan_api_key",key); status.textContent=key?"API key saved on this device":"API key removed";};

function add(role,text){const d=document.createElement("div");d.className="msg "+(role==="user"?"user":"ai");d.textContent=text;chat.appendChild(d);chat.scrollTop=chat.scrollHeight;}
function speak(text){
  if(!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text); u.lang="hi-IN"; u.rate=.95; u.pitch=1.08;
  const voices=speechSynthesis.getVoices();
  const v=voices.find(x=>x.lang.toLowerCase().startsWith("hi") && /female|google hindi/i.test(x.name))
       || voices.find(x=>x.lang.toLowerCase().startsWith("hi"));
  if(v) u.voice=v;
  speechSynthesis.speak(u);
}
$("stop").onclick=()=>speechSynthesis.cancel();

async function ask(text){
  if(!key){ add("ai","API key set nahi hai. Neeche apni key sirf local testing ke liye enter karein."); speak("API key set nahi hai."); return; }
  status.textContent="Savan soch rahi hai…";
  try{
    const r=await fetch("https://api.openai.com/v1/responses",{
      method:"POST",
      headers:{"Content-Type":"application/json","Authorization":"Bearer "+key},
      body:JSON.stringify({
        model:"gpt-5.6-luna",
        input:"You are Savan AI, a warm friendly female-style Hindi/Hinglish personal assistant. Help with UPSC study, daily planning and supportive conversation. Never claim to be a real human or girlfriend. User: "+text
      })
    });
    const data=await r.json();
    if(!r.ok) throw new Error(data.error?.message||("HTTP "+r.status));
    const reply=data.output_text||"Mujhe jawab nahi mila.";
    add("ai",reply); speak(reply); status.textContent="Ready";
  }catch(e){add("ai","Connection/API error: "+e.message);status.textContent="Error";}
}

const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
if(!SR){status.textContent="Is browser mein voice recognition available nahi hai."; mic.disabled=true;}
else{
 const rec=new SR(); rec.lang="hi-IN"; rec.interimResults=false; rec.maxAlternatives=1;
 mic.onclick=()=>{try{rec.start();mic.classList.add("listening");status.textContent="🎙️ Sun rahi hoon…";}catch(e){}};
 rec.onresult=e=>{const t=e.results[0][0].transcript;add("user",t);ask(t);};
 rec.onerror=e=>{status.textContent="Voice error: "+e.error;};
 rec.onend=()=>{mic.classList.remove("listening"); if(status.textContent==="🎙️ Sun rahi hoon…")status.textContent="Ready";};
}
