// Печатающийся заголовок
const textToType = "Где отдохнуть этим летом?";
let i = 0;
const typewriterEl = document.getElementById("typewriterTarget");
function typeWriter() {
    if (i < textToType.length) {
        typewriterEl.innerHTML += textToType.charAt(i);
        i++;
        setTimeout(typeWriter, 90);
    } else {
        typewriterEl.style.borderRightColor = "transparent";
    }
}
typeWriter();

// Данные карточек
const destinations = {
    europe: [
        { name: "Париж, Франция", desc: "Эйфелева башня, круассаны и романтика. Лучшее место для влюблённых.", imgId: "https://avatars.mds.yandex.net/get-entity_search/10920629/1244011367/orig", tag: "Франция" },
        { name: "Рим, Италия", desc: "Колизей, паста, dolce vita. Вечный город ждёт вас.", imgId: "https://avatars.mds.yandex.net/get-entity_search/5126074/1248448344/orig", tag: "Италия" },
        { name: "Барселона, Испания", desc: "Гауди, средиземноморское побережье, фламенко.", imgId: "https://avatars.mds.yandex.net/get-entity_search/4741242/1254691366/orig", tag: "Испания" },
        { name: "Берлин, Германия", desc: "История, современное искусство и лучшие вечеринки.", imgId: "https://avatars.mds.yandex.net/get-entity_search/10767883/1244628321/orig", tag: "Германия" }
    ],
    asia: [
        { name: "Токио, Япония", desc: "Неон, храмы, суши будущего. Смесь традиций и футуризма.", imgId: "https://avatars.mds.yandex.net/get-altay/11356085/2a00000192450c9ddf195c7fbcdd9cd84faa/orig", tag: "Япония" },
        { name: "Бангкок, Таиланд", desc: "Экзотика, уличная еда и райские пляжи.", imgId: "https://avatars.mds.yandex.net/get-entity_search/5449393/1246914246/S600xU_2x", tag: "Таиланд" },
        { name: "Гоа, Индия", desc: "Йога, кокосовые пальмы, океан и безмятежность.", imgId: "https://avatars.mds.yandex.net/get-discovery-int/1339925/8f07304cc5227b55de5907562a19a220/XXXL", tag: "Индия" },
        { name: "Ханой, Вьетнам", desc: "Бухта Халонг, ароматный кофе и дешевые вояжи.", imgId: "https://avatars.mds.yandex.net/get-entity_search/4789399/1246940954/orig", tag: "Вьетнам" }
    ],
    america: [
        { name: "Нью-Йорк, США", desc: "Центральный парк, Бродвей, статуя Свободы. Город, который никогда не спит.", imgId: "https://avatars.mds.yandex.net/get-entity_search/10105370/1244777979/orig", tag: "США" },
        { name: "Ванкувер, Канада", desc: "Горы, океан и кленовый сироп. Идеально для активного отдыха.", imgId: "https://avatars.mds.yandex.net/get-entity_search/2383021/1254662027/orig", tag: "Канада" },
        { name: "Рио-де-Жанейро, Бразилия", desc: "Карнавал, пляж Копакабана и статуя Христа.", imgId: "https://avatars.mds.yandex.net/get-entity_search/5674964/1244962808/orig", tag: "Бразилия" },
        { name: "Канкун, Мексика", desc: "Бирюзовое море, руины майя и вечеринки.", imgId: "https://avatars.mds.yandex.net/get-entity_search/5578182/1244852081/orig", tag: "Мексика" }
    ]
};

// Функция отрисовки карточек
function renderCards(category) {
    const container = document.getElementById('cardsContainer');
    if (!container) return;
    const items = destinations[category];
    if (!items) return;

    container.innerHTML = '';
    items.forEach(item => {
        const imgUrl = item.imgId.startsWith('http') ? item.imgId : `https://picsum.photos/id/${item.imgId}?grayscale&seed=${item.name}`;
        const card = document.createElement('div');
        card.className = 'travel-card';
        card.innerHTML = `
            <img class="card-img" src="${imgUrl}" alt="${item.name}" loading="lazy">
            <div class="card-content">
                <h3>${item.name}</h3>
                <p>${item.desc}</p>
                <span class="country-tag">${item.tag}</span>
            </div>
        `;
        container.appendChild(card);
    });
}

// Табы
const tabBtns = document.querySelectorAll('.tab-btn');
let currentCategory = 'europe';

function setActiveTab(category) {
    tabBtns.forEach(btn => {
        const btnCat = btn.getAttribute('data-category');
        if (btnCat === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function switchCategory(category) {
    currentCategory = category;
    renderCards(category);
    setActiveTab(category);
}

tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const cat = btn.getAttribute('data-category');
        if (cat) switchCategory(cat);
    });
});

renderCards('europe');
setActiveTab('europe');

// Прогресс-бар и слайдер
const slider = document.getElementById('readinessSlider');
const progressFill = document.getElementById('progressFill');
const percentDisplay = document.getElementById('percentDisplay');

function updateProgress(value) {
    const percent = value;
    progressFill.style.width = `${percent}%`;
    progressFill.textContent = `${percent}%`;
    percentDisplay.textContent = `${percent}%`;
}

slider.addEventListener('input', (e) => {
    updateProgress(e.target.value);
});

updateProgress(35);

// Кастомный чекбокс (уведомление)
const newsletterCheck = document.getElementById('newsletterCheck');
newsletterCheck.addEventListener('change', (e) => {
    if (e.target.checked) {
        console.log("Подписка на рассылку оформлена!");
        const msgDiv = document.createElement('div');
        msgDiv.textContent = 'Спасибо! Вы будете получать лучшие туристические предложения.';
        msgDiv.style.position = 'fixed';
        msgDiv.style.bottom = '20px';
        msgDiv.style.left = '50%';
        msgDiv.style.transform = 'translateX(-50%)';
        msgDiv.style.backgroundColor = '#1f6392';
        msgDiv.style.color = 'white';
        msgDiv.style.padding = '10px 24px';
        msgDiv.style.borderRadius = '40px';
        msgDiv.style.fontSize = '0.9rem';
        msgDiv.style.zIndex = '999';
        msgDiv.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
        document.body.appendChild(msgDiv);
        setTimeout(() => { msgDiv.remove(); }, 3000);
    } else {
        console.log("Отписка от рассылки");
    }
});