(function () {
  'use strict';

  const STEEL_GRADES = {
    black: [
      'Ст3', 'Ст20', '09Г2С', '10', '20', '35', '40Х', '45',
      '30ХГСА', '12Х1МФ', 'Х12МФ', '38ХН3МФА', '40ХН', '20Х', '30Х', '35Х', '50ХН',
      '15Х5М', '95Х18', '60С2', '65Г', '50ХФА', '30ХМА', '34ХН1М', '18Х2Н4МА',
      '38ХС', '40ХФА', '45ХН2МФА', '20ХН3А', '25Х2Н4А', '40ХН2МА', '12ХН3А',
      '14Х17Н2', '09Х16Н4Б', '10Х17Н13М2Т', '08Х22Н6Т', '31Х19Н9МВБТ', '12Х18Н9'
    ],
    stainless: [
      '12Х18Н10Т', '08Х18Н10', '08Х13', '12Х13', '20Х13', '03Х17Н14М2',
      '08Х17Н13М2Т', '10Х17Н13М2Т', '08Х18Н12Т', '12Х18Н12Т', '20Х23Н18',
      '15Х25Т', '08Х21Н6М2Т', '03ХН28МДТ', '06ХН28МДТ'
    ],
    aluminum: ['АД0', 'АД1', 'АМг2', 'АМг3', 'АМг5', 'АМг6', 'Д16', 'В95', 'АМц', 'АВ'],
    copper: ['М0', 'М1', 'М2', 'М3', 'М1р', 'М2р', 'М3р'],
    brass: ['Л63', 'ЛС59-1', 'Л68', 'ЛА77-2', 'ЛО70-1', 'ЛО62-1', 'ЛАН59-3-2', 'ЛМц58-2'],
    bronze: ['БрА9-2', 'БрОФ6.5-0.15', 'БрОЦС5-5-5', 'БрОЦС4-4-17', 'БрС30', 'БрАМц9-2', 'БрКМц3-1'],
    titanium: ['ВТ1-0', 'ВТ1-00', 'ВТ3-1', 'ВТ6', 'ОТ4', 'ПТ-1М', 'ВТ20', 'ВТ22']
  };

  const DENSITY = {
    black: 7850,
    stainless: 7900,
    aluminum: 2700,
    copper: 8900,
    brass: 8500,
    bronze: 8700,
    titanium: 4500
  };

  const ANGLE_MASS = {
    '20x20x3': 0.89, '20x20x4': 1.15, '25x25x3': 1.12, '25x25x4': 1.46,
    '30x30x3': 1.36, '30x30x4': 1.78, '40x40x3': 1.85, '40x40x4': 2.42, '40x40x5': 2.98,
    '50x50x4': 3.05, '50x50x5': 3.77, '50x50x6': 4.47, '63x63x4': 3.9, '63x63x5': 4.81, '63x63x6': 5.72,
    '75x75x5': 5.8, '75x75x6': 6.89, '75x75x8': 9.02, '90x90x6': 8.35, '90x90x7': 9.66, '90x90x8': 10.9,
    '100x100x6': 9.37, '100x100x8': 12.25, '100x100x10': 15.1, '125x125x8': 15.5, '125x125x10': 19.1,
    '140x140x9': 19.2, '140x140x10': 21.3, '160x160x10': 24.9, '160x160x12': 29.6,
    '180x180x11': 30.5, '200x200x12': 36.5, '200x200x14': 42.3
  };

  const CHANNEL_MASS = {
    5: 4.84, 6.5: 5.9, 8: 7.05, 10: 8.59, 12: 10.4, 14: 12.3, 16: 14.2, 18: 16.3,
    20: 18.4, 22: 21, 24: 24, 27: 27.7, 30: 31.8, 40: 48.3
  };

  const CHANNEL_ECONOMY_MASS = {
    5: 4.84, 6.5: 5.9, 8: 7.05, 10: 8.59, 12: 10.4, 14: 12.3, 16: 14.01, 18: 16.3, 20: 18.4
  };

  const IBEAM_MASS = {
    10: 9.46, 12: 11.5, 14: 13.7, 16: 15.9, 18: 18.4, 20: 21, 22: 24, 24: 27.3,
    27: 31.5, 30: 36.5, 33: 42.2, 36: 48.6, 40: 57, 45: 66.5, 50: 78.5, 55: 92.6, 60: 108
  };

  const IBEAM_26020_B = {
    10: 8.1, 12: 8.7, 14: 10.9, 16: 12.5, 18: 14.5, 20: 22.4, 22: 25.8, 24: 27.3, 26: 28, 28: 31.4,
    30: 32.9, 35: 41.1, 40: 48.1, 45: 66.2, 50: 92.9, 55: 104.2, 60: 115.6
  };

  const IBEAM_26020_SH = {
    20: 41.2, 25: 48.5, 30: 64.2, 35: 92.6, 40: 104, 45: 133, 50: 155, 55: 186, 60: 208
  };

  const IBEAM_26020_K = {
    20: 57, 25: 62.4, 30: 84.8, 35: 105, 40: 133, 45: 158, 50: 186, 55: 212, 60: 238
  };

  function angleKey(a, t) {
    const A = Math.round(Number(a));
    const T = Math.round(Number(t));
    return A + 'x' + A + 'x' + T;
  }

  function parseChannelN(value) {
    if (value == null || typeof value !== 'string') return null;
    var s = String(value).trim();
    var match = s.match(/^([0-9]+(?:[.,][0-9]+)?)\s*([ПУЭ])$/i);
    if (!match) return null;
    var num = parseFloat(match[1].replace(',', '.'));
    var series = match[2].toUpperCase();
    if (series === 'У' || series === 'П') return { num: num, series: series };
    if (series === 'Э') return { num: num, series: 'Э' };
    return null;
  }

  function channelOptionList() {
    var opts = [];
    Object.keys(CHANNEL_MASS).forEach(function (n) {
      opts.push(n + 'П');
      opts.push(n + 'У');
    });
    Object.keys(CHANNEL_ECONOMY_MASS).forEach(function (n) {
      opts.push(n + 'Э');
    });
    opts.sort(function (a, b) {
      var an = parseFloat(String(a).replace(/[ПУЭ]/gi, ''));
      var bn = parseFloat(String(b).replace(/[ПУЭ]/gi, ''));
      if (an !== bn) return an - bn;
      return String(a).localeCompare(String(b));
    });
    return opts;
  }

  const SORTAMENTS = [
    { id: 'pipe_round', name: 'Труба круглая', fields: [{ id: 'D', label: 'Внешний диаметр', unit: 'мм' }, { id: 'S', label: 'Толщина стенки', unit: 'мм' }, { id: 'L', label: 'Длина', unit: 'м' }], hint: 'Введите внешний диаметр, толщину стенки и длину. Вес: площадь кольца × длина × плотность.', calc: function (params, rho) { var D = params.D / 1000; var s = params.S / 1000; var L = params.L; var innerR = Math.max(0, D / 2 - s); var area = Math.PI * (D * D / 4 - innerR * innerR); return area * L * rho; }, calcLength: function (params, rho) { var D = params.D / 1000; var s = params.S / 1000; var innerR = Math.max(0, D / 2 - s); var area = Math.PI * (D * D / 4 - innerR * innerR); return params.M / (area * rho); } },
    { id: 'circle', name: 'Круг / Пруток', fields: [{ id: 'D', label: 'Диаметр', unit: 'мм' }, { id: 'L', label: 'Длина', unit: 'м' }], hint: 'Введите диаметр и длину. Вес: π×D²/4 × длина × плотность.', calc: function (params, rho) { var D = params.D / 1000; var L = params.L; return (Math.PI * D * D / 4) * L * rho; }, calcLength: function (params, rho) { var area = Math.PI * (params.D / 1000) * (params.D / 1000) / 4; return params.M / (area * rho); } },
    { id: 'sheet', name: 'Лист', fields: [{ id: 'T', label: 'Толщина', unit: 'мм' }, { id: 'W', label: 'Ширина', unit: 'мм' }, { id: 'L', label: 'Длина', unit: 'мм' }, { id: 'Qty', label: 'Количество листов', unit: '' }], hint: 'Введите толщину, ширину, длину в мм и количество листов.', calc: function (params, rho) { var vol = (params.T / 1000) * (params.W / 1000) * (params.L / 1000); var qty = (params.Qty != null && params.Qty > 0) ? params.Qty : 1; return vol * rho * qty; }, calcLength: function (params, rho) { var qty = (params.Qty != null && params.Qty > 0) ? params.Qty : 1; var massOne = params.M / qty; return (massOne / rho) / ((params.T / 1000) * (params.W / 1000)) * 1000; } },
    { id: 'angle', name: 'Уголок равнополочный', fields: [{ id: 'A', label: 'Полка', unit: 'мм' }, { id: 'T', label: 'Толщина полки', unit: 'мм' }, { id: 'L', label: 'Длина', unit: 'м' }], hint: 'ГОСТ 8509-93 или приближённая формула.', calc: function (params, rho) { var a = params.A; var t = params.T; var L = params.L; var key = angleKey(a, t); var kgPerM = ANGLE_MASS[key]; if (kgPerM == null) kgPerM = (2 * a - t) * t * 0.00785; return kgPerM * L * (rho / 7850); }, calcLength: function (params, rho) { var a = params.A; var t = params.T; var key = angleKey(a, t); var kgPerM = ANGLE_MASS[key]; if (kgPerM == null) kgPerM = (2 * a - t) * t * 0.00785; return params.M / (kgPerM * (rho / 7850)); } },
    { id: 'angle_unequal', name: 'Уголок неравнополочный', fields: [{ id: 'A', label: 'Большая полка', unit: 'мм' }, { id: 'B', label: 'Меньшая полка', unit: 'мм' }, { id: 'T', label: 'Толщина полки', unit: 'мм' }, { id: 'L', label: 'Длина', unit: 'м' }], hint: 'ГОСТ 8510-86.', calc: function (params, rho) { var kgPerM = (params.A + params.B - params.T) * params.T * 0.00785; return kgPerM * params.L * (rho / 7850); }, calcLength: function (params, rho) { var kgPerM = (params.A + params.B - params.T) * params.T * 0.00785; return params.M / (kgPerM * (rho / 7850)); } },
    { id: 'channel', name: 'Швеллер', fields: [{ id: 'N', label: 'Номер швеллера', unit: '', channelOptions: true }, { id: 'L', label: 'Длина', unit: 'м' }], hint: 'ГОСТ 8240-97: П, У, Э.', calc: function (params, rho) { var parsed = parseChannelN(params.N); if (!parsed) return null; var tbl = parsed.series === 'Э' ? CHANNEL_ECONOMY_MASS : CHANNEL_MASS; var kgPerM = tbl[parsed.num]; if (kgPerM == null) return null; return kgPerM * params.L * (rho / 7850); }, calcLength: function (params, rho) { var parsed = parseChannelN(params.N); if (!parsed) return null; var tbl = parsed.series === 'Э' ? CHANNEL_ECONOMY_MASS : CHANNEL_MASS; var kgPerM = tbl[parsed.num]; if (kgPerM == null) return null; return params.M / (kgPerM * (rho / 7850)); } },
    { id: 'ibeam', name: 'Двутавр', fields: [{ id: 'ibeamType', label: 'Тип двутавра', unit: '', options: ['ГОСТ 8239-89', 'Нормальный (Б)', 'Широкополочный (Ш)', 'Колонный (К)', 'Дополнительной серии (Д)', 'Сварной (С)'] }, { id: 'N', label: 'Номер двутавра', unit: '' }, { id: 'L', label: 'Длина', unit: 'м' }], hint: 'ГОСТ 8239-89 или ГОСТ 26020-83.', calc: function (params, rho) { var n = Number(params.N); var tbl = IBEAM_MASS; if (params.ibeamType === 'Нормальный (Б)') tbl = IBEAM_26020_B; else if (params.ibeamType === 'Широкополочный (Ш)') tbl = IBEAM_26020_SH; else if (params.ibeamType === 'Колонный (К)') tbl = IBEAM_26020_K; else if (params.ibeamType === 'Дополнительной серии (Д)' || params.ibeamType === 'Сварной (С)') tbl = params.ibeamType === 'Сварной (С)' ? IBEAM_MASS : IBEAM_26020_B; var kgPerM = tbl[n]; if (kgPerM == null) return null; return kgPerM * params.L * (rho / 7850); }, calcLength: function (params, rho) { var n = Number(params.N); var tbl = IBEAM_MASS; if (params.ibeamType === 'Нормальный (Б)') tbl = IBEAM_26020_B; else if (params.ibeamType === 'Широкополочный (Ш)') tbl = IBEAM_26020_SH; else if (params.ibeamType === 'Колонный (К)') tbl = IBEAM_26020_K; else if (params.ibeamType === 'Дополнительной серии (Д)' || params.ibeamType === 'Сварной (С)') tbl = params.ibeamType === 'Сварной (С)' ? IBEAM_MASS : IBEAM_26020_B; var kgPerM = tbl[n]; if (kgPerM == null) return null; return params.M / (kgPerM * (rho / 7850)); } },
    { id: 'pipe_rect', name: 'Профильная труба (прямоугольная)', fields: [{ id: 'A', label: 'Сторона A', unit: 'мм' }, { id: 'B', label: 'Сторона B', unit: 'мм' }, { id: 'S', label: 'Толщина стенки', unit: 'мм' }, { id: 'L', label: 'Длина', unit: 'м' }], hint: 'Внешние размеры A×B и толщина стенки.', calc: function (params, rho) { var a = params.A / 1000; var b = params.B / 1000; var s = params.S / 1000; var outer = a * b; var inner = (a - 2 * s) * (b - 2 * s); var area = Math.max(0, outer - inner); return area * params.L * rho; }, calcLength: function (params, rho) { var a = params.A / 1000; var b = params.B / 1000; var s = params.S / 1000; var outer = a * b; var inner = (a - 2 * s) * (b - 2 * s); var area = Math.max(0, outer - inner); return params.M / (area * rho); } },
    { id: 'square', name: 'Квадрат', fields: [{ id: 'A', label: 'Сторона', unit: 'мм' }, { id: 'L', label: 'Длина', unit: 'м' }], hint: 'Вес: a² × длина × плотность.', calc: function (params, rho) { var a = params.A / 1000; return a * a * params.L * rho; }, calcLength: function (params, rho) { var a = params.A / 1000; return params.M / (a * a * rho); } },
    { id: 'rebar', name: 'Арматура', fields: [{ id: 'D', label: 'Диаметр', unit: 'мм' }, { id: 'L', label: 'Длина', unit: 'м' }], hint: 'Расчёт по номинальному диаметру.', calc: function (params, rho) { var D = params.D / 1000; return (Math.PI * D * D / 4) * params.L * rho; }, calcLength: function (params, rho) { var area = Math.PI * (params.D / 1000) * (params.D / 1000) / 4; return params.M / (area * rho); } },
    { id: 'strip', name: 'Лента', fields: [{ id: 'T', label: 'Толщина', unit: 'мм' }, { id: 'W', label: 'Ширина', unit: 'мм' }, { id: 'L', label: 'Длина', unit: 'м' }], hint: 'Толщина и ширина в мм, длина в метрах.', calc: function (params, rho) { var vol = (params.T / 1000) * (params.W / 1000) * params.L; return vol * rho; }, calcLength: function (params, rho) { var cross = (params.T / 1000) * (params.W / 1000) * rho; return params.M / cross; } },
    { id: 'bend', name: 'Отвод', fields: [{ id: 'D', label: 'Диаметр трубы', unit: 'мм' }, { id: 'S', label: 'Толщина стенки', unit: 'мм' }, { id: 'angle', label: 'Угол отвода', unit: 'град' }, { id: 'R', label: 'Радиус изгиба', unit: 'мм' }], hint: 'Приближённый расчёт по дуге.', calc: function (params, rho) { var D = params.D / 1000; var s = params.S / 1000; var angleRad = (params.angle * Math.PI) / 180; var R = params.R / 1000; var arcLength = R * angleRad; var innerR = Math.max(0, D / 2 - s); var area = Math.PI * (D * D / 4 - innerR * innerR); return area * arcLength * rho; } },
    { id: 'flange', name: 'Фланец', fields: [{ id: 'D_outer', label: 'Внешний диаметр', unit: 'мм' }, { id: 'D_inner', label: 'Внутренний диаметр', unit: 'мм' }, { id: 'T', label: 'Толщина', unit: 'мм' }], hint: 'Кольцо: площадь кольца × толщина × плотность.', calc: function (params, rho) { var Do = params.D_outer / 1000; var Di = params.D_inner / 1000; var t = params.T / 1000; var area = Math.PI * (Do * Do - Di * Di) / 4; return area * t * rho; } },
    { id: 'reducer', name: 'Переход (концентрический)', fields: [{ id: 'D1', label: 'Больший диаметр', unit: 'мм' }, { id: 'D2', label: 'Меньший диаметр', unit: 'мм' }, { id: 'H', label: 'Высота перехода', unit: 'мм' }, { id: 'S', label: 'Толщина стенки', unit: 'мм' }], hint: 'Приближённо: средняя окружность × высота × толщина × плотность.', calc: function (params, rho) { var d1 = params.D1 / 1000; var d2 = params.D2 / 1000; var h = params.H / 1000; var s = params.S / 1000; var meanCirc = Math.PI * (d1 + d2) / 2; return meanCirc * h * s * rho; } }
  ];

  const gradeSelect = document.getElementById('grade');
  const sortamentSelect = document.getElementById('sortament');
  const paramsContainer = document.getElementById('params');
  const calcBtn = document.getElementById('calc-btn');
  const resultEl = document.getElementById('result');
  const hintEl = document.getElementById('hint');
  const historyList = document.getElementById('history');
  const historySection = document.getElementById('history-section');
  const costBlankCheckbox = document.getElementById('cost-blank');
  const costBlankPanel = document.getElementById('cost-blank-panel');
  const pricePerTonInput = document.getElementById('price-per-ton');
  const costMarkupInput = document.getElementById('cost-markup');
  const costCuttingInput = document.getElementById('cost-cutting');
  const costResultEl = document.getElementById('cost-result');
  const requestChoices = document.getElementById('request-choices');
  const requestOpenGmail = document.getElementById('request-open-gmail');
  const requestOpenYandex = document.getElementById('request-open-yandex');
  const requestOpenMailru = document.getElementById('request-open-mailru');
  const requestCopyBody = document.getElementById('request-copy-body');

  let history = [];
  let lastWeightKg = null;

  function getMetal() {
    return document.querySelector('input[name="metal"]:checked').value;
  }

  function getCalcMode() {
    var el = document.querySelector('input[name="calcMode"]:checked');
    return el ? el.value : 'mass';
  }

  function getDensity() {
    return DENSITY[getMetal()];
  }

  function renderGrades() {
    var metal = getMetal();
    var grades = STEEL_GRADES[metal];
    var gradeLabel = document.querySelector('label[for="grade"]');
    if (gradeLabel) gradeLabel.textContent = (metal === 'black' || metal === 'stainless') ? 'Марка стали' : 'Марка / сплав';
    gradeSelect.innerHTML = grades.map(function (g) { return '<option value="' + g + '">' + g + '</option>'; }).join('');
  }

  function renderSortaments() {
    sortamentSelect.innerHTML = SORTAMENTS.map(function (s) { return '<option value="' + s.id + '">' + s.name + '</option>'; }).join('');
    renderParams();
    renderHint();
  }

  function getCurrentSortament() {
    var id = sortamentSelect.value;
    return SORTAMENTS.find(function (s) { return s.id === id; });
  }

  function channelNOptions() {
    return channelOptionList().map(function (v) { return '<option value="' + v + '">' + v + '</option>'; }).join('');
  }

  function ibeamNOptions() {
    var keys = Object.keys(IBEAM_MASS).concat(Object.keys(IBEAM_26020_B)).concat(Object.keys(IBEAM_26020_SH)).concat(Object.keys(IBEAM_26020_K));
    keys = Array.from(new Set(keys)).sort(function (a, b) { return parseFloat(a) - parseFloat(b); });
    return keys.map(function (n) { return '<option value="' + n + '">' + n + '</option>'; }).join('');
  }

  function renderParams() {
    var sort = getCurrentSortament();
    var modeLength = getCalcMode() === 'length';
    if (!sort) return;
    paramsContainer.innerHTML = sort.fields.map(function (f) {
      if (f.id === 'L' && modeLength && sort.calcLength) {
        return '<div class="param-row"><label for="param-L">Масса</label><input type="number" id="param-L" class="param-input" data-id="L" data-mode-length="1" min="0" step="any" placeholder="0"><span class="unit">кг</span></div>';
      }
      if (f.options && Array.isArray(f.options)) {
        var opts = f.options.map(function (v) { return '<option value="' + v + '">' + v + '</option>'; }).join('');
        return '<div class="param-row"><label for="param-' + f.id + '">' + f.label + '</label><select id="param-' + f.id + '" class="select param-input" data-id="' + f.id + '">' + opts + '</select><span class="unit">' + (f.unit || '') + '</span></div>';
      }
      if (f.channelOptions && sort.id === 'channel') {
        return '<div class="param-row"><label for="param-' + f.id + '">' + f.label + '</label><select id="param-' + f.id + '" class="select param-input" data-id="' + f.id + '">' + channelNOptions() + '</select><span class="unit">' + (f.unit || '') + '</span></div>';
      }
      if (f.id === 'N' && sort.id === 'ibeam') {
        return '<div class="param-row"><label for="param-' + f.id + '">' + f.label + '</label><select id="param-' + f.id + '" class="select param-input" data-id="' + f.id + '">' + ibeamNOptions() + '</select><span class="unit">' + (f.unit || '') + '</span></div>';
      }
      var defaultValue = f.id === 'Qty' ? '1' : '';
      return '<div class="param-row"><label for="param-' + f.id + '">' + f.label + '</label><input type="number" id="param-' + f.id + '" class="param-input" data-id="' + f.id + '" min="' + (f.id === 'Qty' ? '1' : '0') + '" step="' + (f.id === 'Qty' ? '1' : 'any') + '" placeholder="' + defaultValue + '" value="' + (f.id === 'Qty' ? '1' : '') + '"><span class="unit">' + (f.unit || '') + '</span></div>';
    }).join('');
  }

  function renderHint() {
    var sort = getCurrentSortament();
    hintEl.textContent = sort ? sort.hint : '';
  }

  function updateCostResult() {
    if (!costResultEl) return;
    var weight = lastWeightKg;
    var pricePerTon = parseFloat((pricePerTonInput && pricePerTonInput.value) ? pricePerTonInput.value.replace(',', '.') : 0) || 0;
    costResultEl.classList.remove('cost-result--error');
    if (weight == null || weight <= 0) {
      costResultEl.innerHTML = '';
      costResultEl.classList.remove('has-value');
      return;
    }
    if (pricePerTon <= 0) {
      costResultEl.textContent = 'Укажите цену за тонну.';
      costResultEl.classList.remove('has-value');
      return;
    }
    var base = (weight / 1000) * pricePerTon;
    var markup = parseFloat((costMarkupInput && costMarkupInput.value) ? costMarkupInput.value.replace(',', '.') : 0) || 0;
    var cutting = parseFloat((costCuttingInput && costCuttingInput.value) ? costCuttingInput.value.replace(',', '.') : 0) || 0;
    var total = base * (1 + markup / 100) + cutting;
    costResultEl.innerHTML = 'Итого: <span class="weight">' + (Math.round(total * 100) / 100) + ' руб</span>';
    costResultEl.classList.add('has-value');
  }

  function getParams() {
    var sort = getCurrentSortament();
    var modeLength = getCalcMode() === 'length';
    if (!sort) return null;
    var params = {};
    var valid = true;
    sort.fields.forEach(function (f) {
      var el = document.getElementById('param-' + f.id);
      if (!el) return;
      var raw = (el.tagName === 'SELECT' ? el.value : el.value.replace(',', '.')).trim();
      var num = parseFloat(raw);
      if (f.id === 'L' && modeLength && sort.calcLength) {
        if (raw === '' || isNaN(num) || num <= 0) valid = false;
        params.M = isNaN(num) ? 0 : num;
        return;
      }
      if (el.tagName === 'SELECT') {
        if (raw === '' && (sort.id === 'channel' || sort.id === 'ibeam')) valid = false;
        if (f.id === 'channelType' || f.id === 'ibeamType' || (sort.id === 'channel' && f.id === 'N')) params[f.id] = raw;
        else params[f.id] = num;
      } else {
        if (raw === '' || isNaN(num) || num < 0) valid = false;
        params[f.id] = f.id === 'Qty' ? (isNaN(num) || num < 1 ? 1 : Math.max(1, Math.floor(num))) : (isNaN(num) ? 0 : num);
      }
    });
    return valid ? params : null;
  }

  function getHistoryCostInfo(weightKg) {
    if (!weightKg || weightKg <= 0) return { pricePerTon: null, totalCost: null };
    var pricePerTon = parseFloat((pricePerTonInput && pricePerTonInput.value) ? pricePerTonInput.value.replace(',', '.') : 0) || 0;
    if (pricePerTon <= 0) return { pricePerTon: null, totalCost: null };
    var base = (weightKg / 1000) * pricePerTon;
    var markup = parseFloat((costMarkupInput && costMarkupInput.value) ? costMarkupInput.value.replace(',', '.') : 0) || 0;
    var cutting = parseFloat((costCuttingInput && costCuttingInput.value) ? costCuttingInput.value.replace(',', '.') : 0) || 0;
    var totalCost = Math.round((base * (1 + markup / 100) + cutting) * 100) / 100;
    return { pricePerTon: pricePerTon, totalCost: totalCost };
  }

  function calculate() {
    var params = getParams();
    var sort = getCurrentSortament();
    var rho = getDensity();
    var modeLength = getCalcMode() === 'length';
    if (!params || !sort) {
      resultEl.innerHTML = '';
      resultEl.classList.remove('has-value');
      if (sort && !params) resultEl.textContent = 'Заполните все поля положительными числами.';
      return;
    }
    if (modeLength && sort.calcLength) {
      try {
        var lengthVal = sort.calcLength(params, rho);
        if (lengthVal == null || isNaN(lengthVal) || lengthVal < 0) {
          resultEl.textContent = 'Не удалось рассчитать длину.';
          resultEl.classList.remove('has-value');
          return;
        }
        var lengthRounded = Math.round(lengthVal * 1000) / 1000;
        var unit = sort.id === 'sheet' ? ' мм' : ' м';
        resultEl.innerHTML = 'Длина: <span class="weight">' + lengthRounded + unit + '</span>';
        resultEl.classList.add('has-value');
        var costInfo = getHistoryCostInfo(params.M);
        history.unshift({ sortament: sort.name, weight: lengthRounded + unit, params: params, isLength: true, isBlank: costBlankCheckbox && costBlankCheckbox.checked, pricePerTon: costInfo.pricePerTon, totalCost: costInfo.totalCost });
        if (history.length > 20) history.pop();
        renderHistory();
        return;
      } catch (e) {
        resultEl.textContent = 'Ошибка расчёта.';
        resultEl.classList.remove('has-value');
        return;
      }
    }
    if (modeLength && !sort.calcLength) {
      resultEl.textContent = 'Для данного сортамента расчёт длины по массе недоступен.';
      resultEl.classList.remove('has-value');
      return;
    }
    try {
      var weight = sort.calc(params, rho);
      if (weight == null || isNaN(weight) || weight < 0) {
        resultEl.textContent = 'Не удалось рассчитать для выбранных параметров.';
        resultEl.classList.remove('has-value');
        return;
      }
      var weightKg = Math.round(weight * 1000) / 1000;
      var lengthM = params.L;
      var linearSortaments = ['pipe_round', 'circle', 'angle', 'angle_unequal', 'channel', 'ibeam', 'pipe_rect', 'square', 'rebar', 'strip'];
      var perM = (lengthM != null && !isNaN(lengthM) && lengthM > 0 && linearSortaments.indexOf(sort.id) !== -1) ? ' <span class="unit">(' + (Math.round((weight / lengthM) * 1000) / 1000) + ' кг/м)</span>' : '';
      resultEl.innerHTML = 'Вес: <span class="weight">' + weightKg + ' кг</span>' + perM;
      resultEl.classList.add('has-value');
      lastWeightKg = weightKg;
      updateCostResult();
      var costInfo = getHistoryCostInfo(weightKg);
      history.unshift({ sortament: sort.name, weight: weightKg, params: params, isBlank: costBlankCheckbox && costBlankCheckbox.checked, pricePerTon: costInfo.pricePerTon, totalCost: costInfo.totalCost });
      if (history.length > 20) history.pop();
      renderHistory();
    } catch (e) {
      resultEl.textContent = 'Ошибка расчёта. Проверьте введённые данные.';
      resultEl.classList.remove('has-value');
    }
  }

  function renderHistory() {
    historySection.style.display = 'block';
    if (history.length === 0) {
      historyList.innerHTML = '<li class="history-empty">Нет расчётов. Выполните расчёт выше.</li>';
      updateRequestLinks();
      return;
    }
    historyList.innerHTML = history.slice(0, 10).map(function (h) {
      var desc = h.sortament + ' — ' + Object.keys(h.params).filter(function (k) { return k !== 'M'; }).map(function (k) { return h.params[k]; }).join(' × ');
      var value = h.isLength ? ('Длина: ' + h.weight) : (h.weight + ' кг');
      var extra = [];
      if (h.totalCost != null) extra.push(h.totalCost + ' руб');
      if (h.isBlank) extra.push('Заготовка');
      var extraStr = extra.length ? (' <span class="history-extra">(' + extra.join(', ') + ')</span>') : '';
      return '<li>' + desc + ' → <span class="history-weight">' + value + '</span>' + extraStr + '</li>';
    }).join('');
    updateRequestLinks();
  }

  function buildRequestEmailBody() {
    if (history.length === 0) return 'История расчётов пуста. Сделайте расчёты в калькуляторе.';
    var lines = ['Заявка из калькулятора металла', '', 'Позиции по расчётам:', ''];
    history.slice(0, 20).forEach(function (h, i) {
      var paramsStr = Object.keys(h.params).filter(function (k) { return k !== 'M'; }).map(function (k) { return k + ': ' + h.params[k]; }).join(', ');
      var value = h.isLength ? ('Длина: ' + h.weight) : ('Вес: ' + h.weight + ' кг');
      var parts = [(i + 1) + '. ' + h.sortament, paramsStr, value];
      if (h.totalCost != null) parts.push(h.totalCost + ' руб');
      if (h.isBlank) parts.push('Заготовка');
      lines.push(parts.join(' | '));
    });
    return lines.join('\r\n');
  }

  var REQUEST_TO = 'cp@spacemetall.ru';
  var REQUEST_SUBJECT = 'Заявка из калькулятора';

  function getRequestMailUrlNoBody(service) {
    var subjectEnc = encodeURIComponent(REQUEST_SUBJECT);
    if (service === 'gmail') return 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(REQUEST_TO) + '&su=' + subjectEnc;
    if (service === 'yandex') return 'https://mail.yandex.ru/compose/?to=' + encodeURIComponent(REQUEST_TO) + '&subject=' + subjectEnc;
    if (service === 'mailru') return 'https://e.mail.ru/compose/?to=' + encodeURIComponent(REQUEST_TO) + '&subject=' + subjectEnc;
    return '#';
  }

  function updateRequestLinks() {
    if (requestOpenGmail) requestOpenGmail.href = getRequestMailUrlNoBody('gmail');
    if (requestOpenYandex) requestOpenYandex.href = getRequestMailUrlNoBody('yandex');
    if (requestOpenMailru) requestOpenMailru.href = getRequestMailUrlNoBody('mailru');
  }

  function copyBodyToClipboard(callback) {
    var body = buildRequestEmailBody();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(body).then(function () { if (callback) callback(); }).catch(function () {
        copyFallback(body);
        if (callback) callback();
      });
    } else {
      copyFallback(body);
      if (callback) callback();
    }
  }

  function openMailAndCopyBody(service) {
    var url = getRequestMailUrlNoBody(service);
    copyBodyToClipboard(function () {
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  function copyRequestToClipboard() {
    var body = buildRequestEmailBody();
    function showCopied() {
      if (requestCopyBody) {
        var t = requestCopyBody.textContent;
        requestCopyBody.textContent = 'Скопировано';
        setTimeout(function () { requestCopyBody.textContent = t; }, 2000);
      }
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(body).then(showCopied).catch(function () {
        copyFallback(body);
        showCopied();
      });
    } else {
      copyFallback(body);
      showCopied();
    }
  }

  function copyFallback(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
    } catch (e) {}
    document.body.removeChild(ta);
  }

  document.querySelectorAll('input[name="metal"]').forEach(function (radio) {
    radio.addEventListener('change', renderGrades);
  });
  document.querySelectorAll('input[name="calcMode"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
      renderParams();
      resultEl.innerHTML = '';
      resultEl.classList.remove('has-value');
    });
  });
  sortamentSelect.addEventListener('change', function () {
    renderParams();
    renderHint();
    resultEl.innerHTML = '';
    resultEl.classList.remove('has-value');
    updateCostResult();
  });
  calcBtn.addEventListener('click', calculate);
  if (requestOpenGmail) requestOpenGmail.addEventListener('click', function (e) { e.preventDefault(); openMailAndCopyBody('gmail'); });
  if (requestOpenYandex) requestOpenYandex.addEventListener('click', function (e) { e.preventDefault(); openMailAndCopyBody('yandex'); });
  if (requestOpenMailru) requestOpenMailru.addEventListener('click', function (e) { e.preventDefault(); openMailAndCopyBody('mailru'); });
  if (requestCopyBody) requestCopyBody.addEventListener('click', copyRequestToClipboard);
  if (costBlankCheckbox && costBlankPanel) {
    costBlankCheckbox.addEventListener('change', function () {
      costBlankPanel.hidden = !costBlankCheckbox.checked;
      if (!costBlankCheckbox.checked) {
        if (costMarkupInput) costMarkupInput.value = '0';
        if (costCuttingInput) costCuttingInput.value = '0';
      }
      updateCostResult();
    });
  }
  [pricePerTonInput, costMarkupInput, costCuttingInput].forEach(function (el) {
    if (el) el.addEventListener('input', updateCostResult);
  });

  renderGrades();
  renderSortaments();
  renderHistory();
  updateRequestLinks();
  if (costBlankPanel) costBlankPanel.hidden = !(costBlankCheckbox && costBlankCheckbox.checked);
  updateCostResult();
})();
