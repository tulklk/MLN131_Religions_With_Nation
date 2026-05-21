/**
 * Ảnh minh họa timeline — khớp nội dung từng mốc lịch sử.
 * Local: public/images/timeline/ | Remote: Wikimedia Commons (next/image)
 */
const W = 'https://upload.wikimedia.org/wikipedia/commons/thumb'

export const TIMELINE_IMAGES = {
  /** Chùa Trấn Quốc, Hà Nội — Phật giáo du nhập / Giao Chỉ */
  tranQuocPagoda: '/images/timeline/phat-giao-du-nhap.jpg',

  /** Chùa Dâu, Bắc Ninh — vùng Luy Lâu, trung tâm Phật giáo sơ khai */
  dauPagodaArt: `${W}/6/64/Dragon%2C_Dau_pagoda%2C_Bac_Ninh_province%2C_wood_-_Vietnam_National_Museum_of_Fine_Arts_-_Hanoi%2C_Vietnam_-_DSC04818.JPG/1280px-Dragon%2C_Dau_pagoda%2C_Bac_Ninh_province%2C_wood_-_Vietnam_National_Museum_of_Fine_Arts_-_Hanoi%2C_Vietnam_-_DSC04818.JPG`,

  /** Chùa Một Cột — Phật giáo quốc giáo thời Lý */
  onePillarPagoda: `${W}/7/74/One_Pillar_Pagoda%2C_Hanoi%2C_Vietnam%2C_20240123_1122_3222.jpg/1280px-One_Pillar_Pagoda%2C_Hanoi%2C_Vietnam%2C_20240123_1122_3222.jpg`,

  /** Thiền viện Trúc Lâm Yên Tử, Quảng Ninh */
  trucLamYenTu: `${W}/e/e6/Ch%C3%B9a_L%C3%A2n-Thi%E1%BB%81n_vi%E1%BB%87n_Tr%C3%BAc_L%C3%A2m_Y%C3%AAn_T%E1%BB%AD.jpg/1280px-Ch%C3%B9a_L%C3%A2n-Thi%E1%BB%81n_vi%E1%BB%87n_Tr%C3%BAc_L%C3%A2m_Y%C3%AAn_T%E1%BB%AD.jpg`,

  /** Chùa chiền — GHPGVN / Phật giáo hiện đại */
  chuaVietNam: '/images/timeline/ghpgvn-1981.jpg',

  /** Tượng Phật Việt Nam */
  tuongPhatVietNam: `${W}/9/9b/Buddha_Statue_in_Vietnam.jpg/1280px-Buddha_Statue_in_Vietnam.jpg`,

  /** Nhà thờ Phát Diệm, Nam Định — Công giáo miền Bắc / vùng du nhập */
  phatDiemCathedral: `${W}/8/8a/Ph%C3%A1t_Di%E1%BB%87m_Cathedral%2C_1920s.jpg/1280px-Ph%C3%A1t_Di%E1%BB%87m_Cathedral%2C_1920s.jpg`,

  /** Nhà thờ khu vực Nam Định (local fallback) */
  nhaThoNamDinh: '/images/timeline/phat-diem-nam-dinh.jpg',

  /** Chân dung Alexandre de Rhodes (Đắc Lộ) */
  alexandreDeRhodes: '/images/timeline/alexandre-de-rhodes.jpg',

  /** Từ điển Việt-Bồ-La 1651 — nền tảng chữ Quốc ngữ */
  tuDienQuocNgu1651: `${W}/5/52/Dictionarium_Annamiticum_Lusitanum_et_Latinum_%28Bayerische_Staatsbibliothek%29.pdf/page1-1280px-Dictionarium_Annamiticum_Lusitanum_et_Latinum_%28Bayerische_Staatsbibliothek%29.pdf.jpg`,

  /** Nhà thờ Đức Bà Sài Gòn — Công giáo phương Nam */
  nhaThoDucBa: '/images/cong-giao/nha-tho-duc-ba-sai-gon.jpg',

  /** Nhà thờ Lớn Hà Nội */
  nhaThoHaNoi: '/images/cong-giao/nha-tho-ha-noi.jpg',
} as const
