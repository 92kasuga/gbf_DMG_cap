const   seraphicUp = document.querySelector("#seraphicUp"),
        supUp = document.querySelector("#supUp"),
        weaponUp = document.querySelector("#weaponUp"),
        otherType = document.querySelector("#otherType"),
        special = document.querySelector("#special"),
        redSkill= document.querySelector("#redSkill"),
        fixedDamage= document.querySelector("#fixedDamage"),
        attackCap = document.querySelector("#attackCap"),
        estimatedAttak = document.querySelector("#estimatedAttack"),
        CACap = document.querySelector("#CACap"),
        estimatedCA = document.querySelector("#estimatedCA"),
        skillCap = document.querySelector("#skillCap"),
        CBCap = document.querySelector("#CBCap"),
        estimatedCB = document.querySelector("#estimatedCB");

//偵測動作並更新計算
seraphicUp.addEventListener("change", function(){
    calculate();
})
supUp.addEventListener("change", function(){
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
redSkill.addEventListener("change", function(){
    calculate();
})
fixedDamage.addEventListener("change", function(){
    calculate();
})
//回到頁面頂端
function topBtn() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
//取得勾選對象的值
function isChecked(form, elem){
    const target = form[name= elem];
    if(target.checked){
        return Number(target.value);
    } else {
        return 0;
    }
}
//取得單選項目的值
function getValue(form, elem){
    const target = Number(form[name= elem].value);
    return target;
}
//避免lb誤選
function reset(){
    const target = otherType[name= "lb"];
    if(otherType[name= "charaLb"].value != 0 || otherType[name= "ring"].value != 0){
        for(i=0; i< target.length; i++) {
            target[i].disabled = true;
        }
        target[0].checked = true;
    }
    else{
        for(i=0; i< target.length; i++) {
            target[i].disabled = false;
        }
    }
}
//判斷角色LB種類
function lb(sort){
    const target = otherType[name= "charaLb"].value;
    reset();
    if(target == sort){
        return 0.1;
    }else{
        return 0;
    }
}
//自訂數值
function customize(form, sort, elem, order){
    const target = Number(form[name= sort].value)
    const val = Number(form[name= elem].value)/100
    reset();
    if(target == order){
        return val;
    }else {
        return 0;
    }
}
//計算全部結果
function calculate(){
    CACal();
    skillCal();
    attackCal();
    CBCal();
}
//主手修正
function cancel(input){
    if(input.checked == true){
        weaponUp[name= "astralAttack"].checked = false;
        weaponUp[name= "huanglong"].checked = false;
        weaponUp[name= "twoSword"].checked = false;
        weaponUp[name= "flammaOrbis"].checked = false;
        weaponUp[name= "qilinLyre"].checked = false;
        weaponUp[name= "astralSkill"].checked = false;
        weaponUp[name= "kengo"].checked = false;
        input.checked= true;
    }
}
//==============最終上限算式==============
function fixedDmgSum(){
    const total = getValue(fixedDamage,"buffDmg") + getValue(fixedDamage,"specialBuffDmg") + getValue(fixedDamage,"weaponDmg") +
    getValue(fixedDamage,"subDmg") + getValue(fixedDamage,"debuffDmg") +
    getValue(fixedDamage,"fieldDmg") + getValue(fixedDamage,"everbaneDmg") + getValue(fixedDamage,"reiDmg");
    return total;
}
function attackCal(){
    const seraphicTotal = getValue(seraphicUp,"seraphic") + getValue(seraphicUp,"arcarum") + getValue(seraphicUp,"otherFinal")/100;
    const others = 
    getValue(supUp,"primarch") +
    getValue(supUp,"chara") +
    handleCommonCap() +
    handleAttack() +
    getValue(otherType,"lb") +
    getValue(otherType,"other")/100;
    const attackDisplay = (seraphicTotal+1) * (others+1);
    attackCap.textContent = attackDisplay.toFixed(2);
    if (otherType.buff.value == 1){
        estimatedAttak.textContent = (attackDisplay * 116 + fixedDmgSum()).toFixed(1);
    } else {
        estimatedAttak.textContent = (attackDisplay * 44.5 + fixedDmgSum()).toFixed(1);
    }
}
function CACal(){
    const seraphicTotal = getValue(seraphicUp,"seraphic") + getValue(seraphicUp,"arcarum");
    const others = 
    getValue(supUp,"primarch") +
    getValue(supUp,"chara") +
    getValue(supUp,"charaCA") +
    isChecked(weaponUp,"huanglong") +
    isChecked(weaponUp,"omegaCA") +
    handleCommonCap() +
    handleCA() +
    lb("CA") +
    customize(otherType,"ring","ringCA", 1) +
    getValue(otherType,"lb") +
    getValue(otherType,"other")/100 +
    getValue(otherType,"otherCA")/100;
    const CADisplay = (seraphicTotal+1) * (others+1);
    CACap.textContent = CADisplay.toFixed(2);
    if (otherType.buff.value == 1){
        estimatedCA.textContent = (CADisplay * (getValue(special,"specialCA") + 50) + fixedDmgSum()).toFixed(1);
    } else {
        estimatedCA.textContent = (CADisplay * getValue(special,"specialCA") + fixedDmgSum()).toFixed(1);
    }
}
function skillCal(){
    const seraphicTotal = getValue(seraphicUp,"seraphic") + getValue(seraphicUp,"arcarum");
    const others = 
    getValue(supUp,"primarch") +
    getValue(supUp,"chara") +
    isChecked(weaponUp,"qilinLyre") +
    isChecked(weaponUp,"flammaOrbis")+
    handleCommonCap() +
    handleSkill() +
    lb("skill") +
    customize(otherType,"ring","ringSkill", 2) +
    getValue(otherType,"lb") +
    getValue(otherType,"other")/100 +
    getValue(otherType,"otherSkill")/100;
    const skillDisplay = (seraphicTotal+1) * (others+1);
    skillCap.textContent = skillDisplay.toFixed(2);
    if (getValue(redSkill,"chosenSkill") == 0){
        estimatedSkill.textContent = 
        ((skillDisplay * getValue(redSkill,"cusSkill") + fixedDmgSum()) * getValue(redSkill,"hit")).toFixed(1);
    } else {
        estimatedSkill.textContent =(skillDisplay * getValue(redSkill,"chosenSkill") + fixedDmgSum()).toFixed(1);
    }
}
function CBCal(){
    const others = handleCB() + getValue(otherType,"otherCB")/100;
    const CBDisplay = (others+1);
    CBCap.textContent = CBDisplay.toFixed(2);
    estimatedCB.textContent = (CBDisplay * 170).toFixed(0);
}
//==============處理各別上限==============
function handleCommonCap(){
    let cap = 
    getValue(weaponUp,"beast") * 0.07 +
    isChecked(weaponUp,"scales") +
    isChecked(weaponUp,"axe") +
    isChecked(weaponUp,"qilinbow") +
    getValue(weaponUp,"cosmos") *0.01;
    if(cap > 0.2){
        cap = 0.2;
    }
    return cap;
}
function handleAttack(){
    let total = isChecked(weaponUp,"astralAttack") + isChecked(weaponUp,"omegaAttack");
    if(total > 0.1){
        total = 0.1;
    }
    return total;
}
function handleCA(){
    let exceedCap = getValue(weaponUp,"exceedNum") * getValue(weaponUp,"exceed");
    let omegaCap = getValue(weaponUp,"sentenceoNum") * getValue(weaponUp,"sentenceo") * getValue(weaponUp,"summono");
    if(omegaCap > 0.3){
        omegaCap = 0.3;
    }
    let normalCap = 
    getValue(weaponUp,"sentenceNum") * getValue(weaponUp,"sentence") * getValue(weaponUp,"summon")+
    getValue(weaponUp,"glorycaNum") * getValue(weaponUp,"gloryca") * getValue(weaponUp,"summon");
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
    let artsCap = getValue(weaponUp,"artsNum") * getValue(weaponUp,"arts");
    if(artsCap > 0.4){
        artsCap = 0.4;
    }
    let twoSwordCap = isChecked(weaponUp,"twoSword");
    let totalA = artsCap + twoSwordCap;
    if(totalA > 0.4){
        totalA = 0.4;
    }
    let totalB = isChecked(weaponUp,"astralSkill") + isChecked(weaponUp,"omegaSkill");
    if(totalB > 0.5){
        totalB = 0.5;
    }
    let total = totalA + totalB;
    return total;
}
function handleCB(){
    let chainForceCap = getValue(weaponUp,"chainForceNum") * getValue(weaponUp,"chainForce");
    let normalCap = getValue(weaponUp,"glorycbNum") * getValue(weaponUp,"glorycb") * getValue(weaponUp,"summoncb");
    let total = chainForceCap + normalCap + isChecked(weaponUp,"kengo") + isChecked(weaponUp,"omedgCB");
    if(total > 0.5){
        total = 0.5;
    }
    return total;
}