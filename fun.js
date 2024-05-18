// دالة لتوليد أرقام عشوائية بين الحد الأدنى والحد الأقصى
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var leaderboard = [];// مصفوفة لتخزين النتائج
var storedNumbers; // مصفوفة لتخزين الأرقام المعروضة
var score = 0; // متغير لتتبع عدد النقاط
var roundsPlayed = 0; // عدد المرات التي لعبها اللاعب

// دالة للتحقق من صحة الإدخال
function verifyInput(inputValue, storedNumbers) {
    var inputNumbers = inputValue.split(',').map(function(num) {
        return parseInt(num.trim(), 10);
    });
    if (inputNumbers.length !== storedNumbers.length) {
        return false; // عدد الأرقام غير متطابق
    }
    for (var i = 0; i < storedNumbers.length; i++) {
        if (inputNumbers[i] !== storedNumbers[i]) {
            return false; // الإدخال غير صحيح
        }
    }
    return true; // الإدخال صحيح
}

function startGame() {
    
    if(roundsPlayed>20){
        alert("لقت لعبت اكثر من 20 مرة يرجى حفظ النتيجة");
    }
    else{
    console.log('بدء اللعبة');
    var playerName = document.getElementById('playerName').value;
    console.log('اسم اللاعب:', playerName);
    storedNumbers = []; // إعادة تعيين مصفوفة تخزين الأرقام المعروضة
    for (var i = 0; i < 5; i++) { // توليد 5 أرقام عشوائية
        storedNumbers.push(generateRandomNumber(1, 9));
    }
    console.log('الأرقام المعروضة:', storedNumbers);
    
    var numbersDisplay = document.getElementById('numbersDisplay');
    numbersDisplay.innerHTML = ''; // حذف أي محتوى قديم
    storedNumbers.forEach(function(number) {
        var span = document.createElement('span');
        span.textContent = number + ' '; // إضافة الرقم مع فراغ
        numbersDisplay.appendChild(span);
    });
    
    var gameContainer = document.querySelector('.game-container');
    gameContainer.style.display = 'block'; // إظهار واجهة اللعب
    
    // تأخير إخفاء واجهة الأرقام بعد 5 ثوانٍ
    setTimeout(function() {
        gameContainer.style.display = 'none';
        
        var inputField = document.getElementById('playerInput');
        var submitButton = document.getElementById('submitButton');
        inputField.style.display = 'block'; // إظهار حقل الإدخال
        submitButton.style.display = 'block'; // إظهار زر الإرسال
        inputField.focus(); // تركيز حقل الإدخال
        
        // التحقق من الإدخال عند الضغط على زر الإرسال
        submitButton.onclick = function() {
            var userInput = parseInt(inputField.value); // تحويل الإدخال إلى رقم صحيح
            var correctNumbers = storedNumbers.reduce(function(acc, num) {
                return acc && num === userInput;
            }, true);
            
            if (correctNumbers) {
                alert('إدخال صحيح!');
                // هنا يمكنك زيادة عدد الأرقام والانتقال إلى المرحلة التالية
            } else {
                alert('إدخال خاطئ!');
                // هنا يمكنك تقليل عدد الأرقام والمتابعة في نفس المرحلة
            }
        };

        var rememberedNumbers = document.getElementById('rememberedNumbers');
        rememberedNumbers.style.display = 'block'; // إظهار الحقل الجديد
    }, 5000);
}
}

// دالة لعرض قائمة المتصدرين
function displayLeaderboard() {
    var leaderboardContainer = document.getElementById('leaderboard');
    leaderboardContainer.innerHTML = ''; // حذف أي محتوى قديم

    leaderboard.forEach(function(entry, index) {
        var listItem = document.createElement('li');
        listItem.textContent = (index + 1) + '. ' + entry.playerName + ' - Score: ' + entry.score;
        leaderboardContainer.appendChild(listItem);
    });
}
function submitNumbers() {
    
    var userInput = parseInt(document.getElementById('playerInput').value);
    
    if (isNaN(userInput)) {
        alert('الرجاء إدخال رقم صحيح.');
        return;
    }
    
    var correctNumbers = storedNumbers.reduce(function(acc, num) {
        return acc && num === userInput;
    }, true);
    
    if (correctNumbers) {
        alert('إدخال صحيح!');
        // هنا يمكنك زيادة عدد الأرقام والانتقال إلى المرحلة التالية
    } else {
        alert('إدخال خاطئ!');
        // هنا يمكنك تقليل عدد الأرقام والمتابعة في نفس المرحلة
    }
}


function verifyRememberedNumbers() {
    if(roundsPlayed>20){
        alert("لقت لعبت اكثر من 20 مرة يرجى حفظ النتيجة");
    }
    else{
    var rememberedInput = document.getElementById('rememberedInput').value;
    var rememberedNumbers = rememberedInput.split(',').map(function(num) {
        return parseInt(num.trim(), 10);
    });
    var correctNumbers = verifyInput(rememberedInput, storedNumbers);
    if (correctNumbers) {
        alert('الأرقام المذكورة صحيحة!');
        score++; // زيادة عدد النقاط
        document.getElementById('score').textContent = score; // عرض النقاط المحدثة
        startGame(); // إعادة تشغيل اللعبة
    } else {
        alert('الأرقام المذكورة خاطئة!');
    }}
    roundsPlayed++;
}


function saveScore() {
    var playerName = document.getElementById('playerName').value;
    console.log('حفظ النتيجة للاعب:', playerName);
    var scoreEntry = {
        playerName: playerName,
        score: score
    };
    leaderboard.push(scoreEntry); // إضافة النتيجة إلى المصفوفة

    // عرض قائمة المتصدرين
    displayLeaderboard();

    // عرض نتيجة اللاعب
    alert('تم حفظ نتيجتك! نقاطك: ' + score);

   
}

function displayLeaderboard() {
    var leaderboardContainer = document.getElementById('leaderboard');
    if (leaderboardContainer) {
        leaderboardContainer.innerHTML = ''; // حذف أي محتوى قديم

        leaderboard.forEach(function(entry, index) {
            var listItem = document.createElement('li');
            listItem.textContent = (index + 1) + '. ' + entry.playerName + ' - Score: ' + entry.score;
            leaderboardContainer.appendChild(listItem);
        });
    } else {
        console.error('عنصر قائمة المتصدرين غير موجود في الصفحة.');
    }
}
function verifyInput(inputValue, storedNumbers) {
    var inputNumbers = inputValue.split(/[,\s]+/) // تقسيم القيمة المدخلة بواسطة فواصل أو مسافات
                                .filter(function(num) {
                                    return num.trim() !== ''; // تصفية القيم الفارغة بعد التقسيم
                                })
                                .map(function(num) {
                                    return parseInt(num, 10); // تحويل القيم إلى أرقام صحيحة
                                });

    if (inputNumbers.length !== storedNumbers.length) {
        return false; // عدد الأرقام غير متطابق
    }
    
    for (var i = 0; i < storedNumbers.length; i++) {
        if (inputNumbers[i] !== storedNumbers[i]) {
            return false; // الإدخال غير صحيح
        }
    }
    
    return true; // الإدخال صحيح
}