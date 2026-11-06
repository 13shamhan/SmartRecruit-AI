(function(root){
const aliases={js:'javascript',ts:'typescript',python3:'python',postgresql:'postgres','react.js':'react','node.js':'node'};
function skills(s){return [...new Set(String(s).split(',').map(x=>x.trim().toLowerCase()).filter(Boolean).map(x=>aliases[x]||x))];}
function calculate(c,j){const need=skills(j.skills),have=skills(c.skills),matched=need.filter(x=>have.includes(x)),missing=need.filter(x=>!have.includes(x));const skill=need.length?matched.length/need.length*j.weight:0;const exp=c.years===null?0:(j.years===0?1:Math.min(c.years/j.years,1))*(100-j.weight);return {...c,matched,missing,skill,exp,score:Math.round((skill+exp)*100)/100};}
function rank(cs,j){const rows=cs.map(c=>calculate(c,j)).sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id,'ru'));rows.forEach((r,i)=>r.rank=i&&r.score===rows[i-1].score?rows[i-1].rank:i+1);return rows;}
root.Scoring={skills,calculate,rank};if(typeof module!=='undefined')module.exports=root.Scoring;
})(typeof window!=='undefined'?window:globalThis);
