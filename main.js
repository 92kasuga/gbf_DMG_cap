const   seraphicUp = document.querySelector("#seraphicUp"),
        primarchUp = document.querySelector("#primarchUp"),
        weaponUp = document.querySelector("#weaponUp"),
        otherType = document.querySelector("#otherType"),
        special = document.querySelector("#special"),
        attackCap = document.querySelector("#attackCap"),
        estimatedAttak = document.querySelector("#estimatedAttack"),
        CACap = document.querySelector("#CACap"),
        estimatedCA = document.querySelector("#estimatedCA"),
        skillCap = document.querySelector("#skillCap"),
        CBCap = document.querySelector("#CBCap"),
        estimatedCB = document.querySelector("#estimatedCB");

seraphicUp.addEventListener("change", function(){
    calculate();
})
primarchUp.addEventListener("change", function(){
    calculate();
})
weaponUp.addEventListener("change", function(){
    calculate();
})
otherType.addEventListener("change", function(){
    calculate();
})
special.addEventListener("change", function(){
    calculate();
})
//回到頂端
function topBtn() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
//即時計算
function calculate(){
    attackCal();
    CACal();
    skillCal();
    CBCal();
}
//==============最終上限算式==============
function attackCal(){
    const seraphicTotal = Number(seraphicUp.seraphic.value) + Number(seraphicUp.arcarum.value) + Number(seraphicUp.otherFinal.value)/100;
    const others = 
    Number(primarchUp.primarch.value) + 
    Number(weaponUp.omegaAttack.value) * 0.1 +
    handleCommonCap() +
    Number(otherType.lb.value) +
    Number(otherType.other.value)/100;
    const attackDisplay = (seraphicTotal+1) * (others+1);
    attackCap.textContent = attackDisplay.toFixed(2);
    if (otherType.buff.value == 1){
        estimatedAttak.textContent = (attackDisplay * 116).toFixed(1);
    } else {
        estimatedAttak.textContent = (attackDisplay * 44.5).toFixed(1);
    }
}
function CACal(){
    const seraphicTotal = Number(seraphicUp.seraphic.value) + Number(seraphicUp.arcarum.value);
    const others = 
    Number(primarchUp.primarch.value) +
    Number(weaponUp.huanglong.value) * 0.2 +
    Number(weaponUp.omedaCA.value) * 0.15 +
    handleCommonCap() +
    handleCA() +
    Number(otherType.lb.value) +
    Number(otherType.other.value)/100 +
    Number(otherType.otherCA.value)/100;
    const CADisplay = (seraphicTotal+1) * (others+1);
    CACap.textContent = CADisplay.toFixed(2);
    if (otherType.buff.value == 1){
        estimatedCA.textContent = (CADisplay * Number(special.specialCA.value) + 50).toFixed(1);
    } else {
        estimatedCA.textContent = (CADisplay * Number(special.specialCA.value)).toFixed(1);
    }
}
function skillCal(){
    const seraphicTotal = Number(seraphicUp.seraphic.value) + Number(seraphicUp.arcarum.value);
    const others = 
    Number(primarchUp.primarch.value) +
    Number(weaponUp.qilinLyre.value) * 0.2 +
    Number(weaponUp.omegaSkill.value) * 0.5 +
    handleCommonCap() +
    handleSkill() +
    Number(otherType.lb.value) +
    Number(otherType.other.value)/100 +
    Number(otherType.otherSkill.value)/100;
    const skillDisplay = (seraphicTotal+1) * (others+1);
    skillCap.textContent = skillDisplay.toFixed(2);
}
function CBCal(){
    const CBDisplay = (handleCB()+1);
    CBCap.textContent = CBDisplay.toFixed(2);
    estimatedCB.textContent = (CBDisplay * 170).toFixed(1);
}
//==============處理各別上限==============
function handleCommonCap(){
    let cap = 
    Number(weaponUp.beast.value) * 0.07 +
    Number(weaponUp.scales.value) * 0.1+
    Number(weaponUp.axe.value) * 0.1+
    Number(weaponUp.qilinbow.value) * 0.1+
    Number(weaponUp.cosmos.value) *0.01;
    if(cap > 0.2){
        cap = 0.2;
    }
    return cap;
}
function handleCA(){
    let exceedCap = Number(weaponUp.exceedNum.value) * Number(weaponUp.exceed.value);
    let omegaCap = Number(weaponUp.sentenceoNum.value) * Number(weaponUp.sentenceo.value) * Number(weaponUp.summono.value);
    if(omegaCap > 0.3){
        omegaCap = 0.3;
    }
    let normalCap = 
    Number(weaponUp.sentenceNum.value) * Number(weaponUp.sentence.value) * Number(weaponUp.summon.value)+
    Number(weaponUp.glorycaNum.value) * Number(weaponUp.gloryca.value) * Number(weaponUp.summon.value);
    if(normalCap > 0.3){
        normalCap = 0.3;
    }
    let total = exceedCap + omegaCap + normalCap
    if(total > 0.6){
        total = 0.6;
    }
    return total;
}
function handleSkill(){
    let artsCap = Number(weaponUp.artsNum.value) * Number(weaponUp.arts.value);
    if(artsCap > 0.4){
        artsCap = 0.4;
    }
    let twoSwordCap = Number(weaponUp.twoSword.value) * 0.1;
    let dualBladeCap = Number(weaponUp.dualBlade.value) * 0.2;
    let total = artsCap + twoSwordCap + dualBladeCap;
    if(total > 0.4){
        total = 0.4;
    }
    return total;
}
function handleCB(){
    let chainForceCap = Number(weaponUp.chainForceNum.value) * Number(weaponUp.chainForce.value);
    let normalCap = Number(weaponUp.glorycbNum.value) * Number(weaponUp.glorycb.value) * Number(weaponUp.summoncb.value);
    let total = chainForceCap + normalCap + Number(weaponUp.kengo.value) * 0.3 + Number(weaponUp.omedgCB.value) * 0.5
    if(total > 0.5){
        total = 0.5;
    }
    return total;
}