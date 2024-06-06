import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
const otobusDurumList = ['Beklemede', 'Dolu', 'Yolculukta', 'Bakımda'];
const otobusDurakNoktasiList = ['Safiye Hüseyin Elbi', 'ARDES', 'Mehmet Akif Ersoy Gençlik Merkezi',
                                    'Mühendislik Fakültesi', 'Sosyal Bilimler Meslek Yüksekokulu',
                                    'Yabanci Diller Yüksekokulu', 'Güzel Sanatlar & İletişim Fakültesi', 
                                    'Deniz Bilimleri','Mimarlık ve Tasarım Fakültesi','Troia Kültür Merkezi',
                                    'Fen Edebiyat Fakültesi','ÖSEM','Ziraat Fakültesi','Siyasal Bilimler Fakültesi'];//To be continued...
                                    
const otobusBaslangicNoktasiList = ['Safiye Hüseyin Elbi','Hasan Mevsuf Spor Salonu','Araştırma Hastanesi'];

export default function InsertOtobus() {
    const [otobusPlakaNo, setOtobusPlakaNo] = useState('');
    const [otobusRuhsatNo, setOtobusRuhsatNo] = useState('');
    const [otobusKapasite, setOtobusKapasite] = useState(0); 
    const [otobusDurum, setOtobusDurum] = useState(otobusDurumList[0]);
    const [otobusSarj, setOtobusSarj] = useState('');
    const [otobusBaslangicNoktasi, setOtobusBaslangicNoktasi] = useState(otobusBaslangicNoktasiList[0]);
    const [createdAt] = useState(Date);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate("");

    const setPlaka = (e) => {
        setOtobusPlakaNo(e.target.value);
      };
    
      const setRuhsat = (e) => {
        setOtobusRuhsatNo(e.target.value);
      };
    
      const setKapasite = (e) => {
        setOtobusKapasite(e.target.value);
    };
    const setDurum = (e) => {
        setOtobusDurum(e.target.value);
    };
    const setSarj = (e) =>{
        setOtobusSarj(e.target.value);
    };
    const setBaslangicNoktasi = (e) =>{
        setOtobusBaslangicNoktasi(e.target.value);
    }

    const addOtobus = async (e) => {
        e.preventDefault();

        if (!otobusPlakaNo || !otobusRuhsatNo || !otobusKapasite || !otobusDurum || !otobusSarj) {
            setError("*Lütfen gerekli tüm alanları doldurun.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch(`http://localhost:3001/insertotobus`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "OtobusPlakaNo": otobusPlakaNo, "OtobusRuhsatNo": otobusRuhsatNo, "OtobusKapasite": otobusKapasite,
                                       "OtobusDurum": otobusDurum, "OtobusSarj": otobusSarj, "OtobusBaslangicNoktasi": otobusBaslangicNoktasi, "createdAt": Date.now })
            });
            //console.log(response.json());
            await response.json();

            if (response.status === 201) {
                alert("Veriler Güncellendi");
                navigate('/otobusler');
            }
            else {
                setError("Bir şeyler ters gitti. Lütfen tekrar deneyin.", response.status);
            }
        } catch (err) {
            setError("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
            console.log(err);
        } finally {
            setLoading(false);
        }

        
    }

    return (
        <div className='container-fluid p-5'>
            <h1 className=''>Otobüs Bilgilerini Girin</h1>
            <div className="mt-5 col-lg-6 col-md-6 col-12">
                <label htmlFor="otobus_plakaNo" className="form-label fs-4 fw-bold">Araç Plakası*</label>
                <input type="text" onChange={setPlaka} value={otobusPlakaNo} maxLength={10} className="form-control fs-5" id="otobus_plakaNo" placeholder="Araç Plakasını Girin" required />
            </div>

            <div className="mt-3 col-lg-6 col-md-6 col-12">
                <label htmlFor="otobus_ruhsatNo" className="form-label fs-4 fw-bold">Araç Ruhsat Numarası*</label>
                <input type="text" onChange={setRuhsat} value={otobusRuhsatNo} maxLength={7} className="form-control fs-5" id="otobus_ruhsatNo" placeholder="Araç Ruhsat No" required />
            </div>
            <div className="mt-3 col-lg-6 col-md-6 col-12">
                <label htmlFor="otobus_kapasite" className="form-label fs-4 fw-bold">Araç Kapasitesi*</label>
                <input type="text" onChange={setKapasite} value={otobusKapasite} maxLength={7} className="form-control fs-5" id="otobus_kapasite" placeholder="Araç Kapasitesi" required />
            </div>
            <div className="mt-3 col-lg-6 col-md-6 col-12">
                <label htmlFor="otobus_sarj" className="form-label fs-4 fw-bold">Araç Şarjı*</label>
                <input type="text" onChange={setSarj} value={otobusSarj} maxLength={7} className="form-control fs-5" id="otobus_sarj" placeholder="Araç Şarjı" required />
            </div>


            <div className="mt-3 mb-5 col-lg-6 col-md-6 col-12">
                <label htmlFor="otobus_baslangicNoktasi" className="form-label fs-4 fw-bold">Otobüs Başlangıç Noktası</label>
                <select
                        value={otobusBaslangicNoktasi}
                        onChange={setBaslangicNoktasi}
                        className="form-control fs-5"
                        id="otobus_baslangicNoktasi"
                        required
                >{otobusBaslangicNoktasiList.map((option) => (
                    <option key={option} value={option}>
                    {option}
                </option>
                ))}
            </select>
            </div>
            <div className="mt-3 mb-5 col-lg-6 col-md-6 col-12">
                <label htmlFor="otobus_durum" className="form-label fs-4 fw-bold">Otobüs Durumu</label>
                <select
                        value={otobusDurum}
                        onChange={setDurum}
                        className="form-control fs-5"
                        id="otobus_durum"
                        required
                >{otobusDurumList.map((option) => (
                    <option key={option} value={option}>
                    {option}
                </option>
                ))}
                </select>
            </div>
            <div className='d-flex justify-content-center col-lg-6 col-md-6'>
                <NavLink to="/otobusler" className='btn btn-primary me-5 fs-4'>İptal</NavLink>
                <button type="submit" onClick={addOtobus} className="btn btn-primary fs-4" disabled={loading}>{loading ? 'Ekleniyor...' : 'Ekle'}</button>
            </div>
            
            <div className="col text-center col-lg-6 ">
                {error && <div className="text-danger mt-3 fs-5 fw-bold">{error}</div>}
            </div>
        </div>
    )
}
