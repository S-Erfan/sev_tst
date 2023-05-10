export const TypepersianNumber = (e) => {
  var persianNumbers = [
      /۰/g,
      /۱/g,
      /۲/g,
      /۳/g,
      /۴/g,
      /۵/g,
      /۶/g,
      /۷/g,
      /۸/g,
      /۹/g,
    ],
    arabicNumbers = [
      /٠/g,
      /١/g,
      /٢/g,
      /٣/g,
      /٤/g,
      /٥/g,
      /٦/g,
      /٧/g,
      /٨/g,
      /٩/g,
    ],
    fixNumbers = function (str) {
      if (typeof str === "string") {
        for (var i = 0; i < 10; i++) {
          str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
        }
      }
      return str;
    };
  return fixNumbers(e);
};

export const validationPhone = (phoneNum) => {
  if (/^[0]?[9][0-9]{9}$/.test(phoneNum) && phoneNum.length === 11) {
    return true;
  } else return false;
};

export const TypeNumber = (e) => {
  if (!e) {
    e = window.event;
  }

  var code = e.keyCode || e.which;

  if (!e.ctrlKey) {
    if (code > 31 && (code < 48 || code > 57) && (code < 96 || code > 105)) {
      e.preventDefault();
      return false;
    }
  }
  return true;
};

export const convertTimeStamp = (timeStamp) => {
  let options = { year: "numeric", month: "numeric", day: "numeric" };
  const myDate = new Date(timeStamp * 1000).toLocaleString();
  return myDate;
};

export const convertDate = (oldDate) => {
  let options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    timeZone: "Asia/Tehran",
  };
  const date = new Date(oldDate).toLocaleDateString("fa-IR", options);
  return date;
};

export const convertDateToTime = (oldDate) => {
  const date = new Date(oldDate);
  return `${date.getHours()}:${date
    .getMinutes()
    .toString()
    .replace(/^(\d)$/, "0$1")}`;
};

export const checkerLiked = (productId, arrLikes) => {
  const result = arrLikes.filter((item) => item.location_id == productId);
  if (result.length > 0) {
    return true;
  } else {
    return false;
  }
};

export const showBankNumber = (length, value) => {
  var val = value;
  var show = value;

  return { val: val, show: show };
};

export const toPriceFormater = (str) => {
  let dollarIndianLocale = Intl.NumberFormat("en-US");
  return dollarIndianLocale.format(str);
};

export const persianNumbers = (s) => {
  return s.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
};

export const persianTypeKeys = (e) => {
  if (!e) {
    e = window.event;
  }
  let char = new RegExp(
    "[\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u06A9\u06AF\u06BE\u06CC]"
  );
  if (e.keyCode === 8 || e.keyCode === 32) {
    return true;
  }
  if (char.test(e.key || e.which) === true) {
    return true;
  } else {
    e.preventDefault();
    return false;
  }
};

export const engTypeKeys = (e) => {
  if (!e) {
    e = window.event;
  }
  let char = new RegExp(
    "[\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651\u0655\u067E\u0686\u0698\u06A9\u06AF\u06BE\u06CC]"
  );

  const reg = new RegExp("^[0-9]+$");

  if (e.keyCode === 8) {
    return true;
  }
  if (e.code === "Space") {
    e.preventDefault();
    return;
  }
  if (
    char.test(e.key || e.which) === true ||
    reg.test(e.key || e.which) === true
  ) {
    e.preventDefault();
    return false;
  } else {
    return true;
  }
};
