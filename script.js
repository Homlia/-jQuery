
$(function () {
  const cost = 46499;

  let valueSumm;

  let valueRAM;
  let valueSSD;

  let arrImg = [];
  const arrFileImg = ["greyColor", "silverColor", "purplish-whiteColor"];
  const arrColorName = ["Космический серый", "Серебряный", "Пурпурно-белый"];

  const maxPhoto = 6;

  let fileImgIndex = 0;
  let fileImgName;

  let indexPhoto = 1;
  let indexPoint = 1;
  let indexColor = 1;

  // Функция для массива SRC фото

  function newPhoto() {
    if (arrImg.length > 0) {
      arrImg = [];
    }
    for (let i = 1; i <= maxPhoto; i++) {
      arrImg.push(`/img/${fileImgName}/${fileImgName}-${i}.jpg`);
    }
    i = 1;
  }

  // newPhoto();

  // события переключение картинок

  $("#next").on("click", function () {
    $("#photo").attr("src", nextPhoto());
  });

  $("#before").on("click", function () {
    indexPhoto--;
    $("#photo").attr("src", beforePhoto());
  });

  function nextPhoto() {
    indexPhoto++;
    if (indexPhoto > maxPhoto) {
      indexPhoto = 1;
    }

    $(".pointsNavigation li").removeClass("acrivePointNavigation");
    $(`.pointsNavigation li[data-indexPoint=${indexPhoto}]`).addClass(
      "acrivePointNavigation"
    );

    let srcText = `/img/${fileImgName}/${fileImgName}-${indexPhoto}.jpg`;
    return srcText;
  }

  function beforePhoto() {
    indexPhoto;
    if (indexPhoto < 1) {
      indexPhoto = maxPhoto;
    }
    $(".pointsNavigation li").removeClass("acrivePointNavigation");
    $(`.pointsNavigation li[data-indexPoint=${indexPhoto}]`).addClass(
      "acrivePointNavigation"
    );

    let srcText = `/img/${fileImgName}/${fileImgName}-${indexPhoto}.jpg`;
    return srcText;
  }

  // Назначаю всем точкам новый аргумент

  for (let key of $(".pointsNavigation li")) {
    let text = $(".pointsNavigation li");
    text.eq(indexPoint - 1).attr("data-indexPoint", `${indexPoint++}`);
  }

  $(".pointsNavigation li").on("click", function () {
    $(".pointsNavigation li").removeClass("acrivePointNavigation");
    $(this).addClass("acrivePointNavigation");
    indexPhoto = $(this).attr("data-indexPoint") - 1;
    $("#photo").attr("src", nextPhoto());
  });

  // Точки с цветом

  // Назначаю всем точкам с цветом новый аргумент
  for (let key of $(".colorPoints li")) {
    let text = $(".colorPoints li");
    text.eq(indexColor - 1).attr("data-indexColor", `${indexColor++}`);
  }

  // событие точек с цветом

  $(".colorPoints li").on("click", function () {
    $(".colorPoints li").removeClass("active");
    $(this).addClass("active");
    nowColor();
  });

  function nowColor() {
    fileImgIndex = $(".colorPoints .active").attr("data-indexColor") - 1;
    fileImgName = arrFileImg[fileImgIndex];
    newPhoto();

    $("#photo").attr(
      "src",
      `/img/${fileImgName}/${fileImgName}-${indexPhoto}.jpg`
    );
    newText();
  }

  nowColor();

  $("#photo").attr("src", `/img/${arrFileImg[0]}/${arrFileImg[0]}-${1}.jpg`);

  function newText() {
    $("h1").text(
      `Ноутбук Apple MacBook Air 13 M1 (MGN63) ${arrColorName[fileImgIndex]}`
    );
    $("#infoColor").text(`Цвет: ${arrColorName[fileImgIndex]}`);
  }

  // Часть с взаимодейсвием с ценой

  // Действия с RAM
  $(".RAM input").on("change", function () {
    $(".RAM input").removeClass("activeRAM");
    $(this).addClass("activeRAM");

    // дописываю текст Характеристити

    $(
      "#characteristics"
    ).text(`13.3" (2560x1600) IPS / Apple M1 / 8 core CPU / ${$(".RAM .activeRAM").attr("id")} ГБ / ${$(".SSD .activeSSD").attr("id")} ГБ/ 7 core GPU / Bluetooth
          Wi-Fi / macOS / Без ОД / 1.29 кг`);
    

    RAM();
  });

  function RAM() {
    valueRAM = $(".RAM .activeRAM").attr("value");

    summ();
  }

  RAM();

  // Действие в SSD

  $(".SSD input").on("change", function () {
    $(".SSD input").removeClass("activeSSD");
    $(this).addClass("activeSSD");

    // дописываю текст Характеристити

    $(
      "#characteristics"
    ).text(`13.3" (2560x1600) IPS / Apple M1 / 8 core CPU / ${$(".RAM .activeRAM").attr("id")} ГБ / ${$(".SSD .activeSSD").attr("id")} ГБ/ 7 core GPU / Bluetooth
          Wi-Fi / macOS / Без ОД / 1.29 кг`);

    
    SSD();
  });

  function SSD() {
    valueSSD = $(".SSD .activeSSD").attr("value");
    summ();
  }

  SSD();

  // Сумирование

  function summ() {
    valueSumm = parseInt(cost) + parseInt(valueRAM) + parseInt(valueSSD);
    Installment();
    $("#cost").text(`${valueSumm} ₴`);
  }

  // Россрочка

  function Installment() {
    $(".buttonInstallment").text(`${(valueSumm / 7).toFixed(0)} / месяц`);
  }

  Installment();
});

