import React, { useEffect, useState } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom';

const otobusDurumList = ['Beklemede', 'Dolu', 'Yolculukta', 'Bakımda'];
const otobusDurakNoktasiList = ['Safiye Hüseyin Elbi', 'ARDES', 'Mehmet Akif Ersoy Gençlik Merkezi',
                                    'Mühendislik Fakültesi', 'Sosyal Bilimler Meslek Yüksekokulu',
                                    'Yabanci Diller Yüksekokulu', 'Güzel Sanatlar & İletişim Fakültesi', 
                                    'Deniz Bilimleri','Mimarlık ve Tasarım Fakültesi','Troia Kültür Merkezi',
                                    'Fen Edebiyat Fakültesi','ÖSEM','Ziraat Fakültesi','Siyasal Bilimler Fakültesi'];//To be continued...
const otobusBaslangicNoktasiList = ['Safiye Hüseyin Elbi','Hasan Mevsuf Spor Salonu','Araştırma Hastanesi'];
export default function UpdateOtobus() {
    const [otobusPlakaNo, setOtobusPlakaNo] = useState('');
    const [otobusRuhsatNo, setOtobusRuhsatNo] = useState('');
    const [otobusKapasite, setOtobusKapasite] = useState(0); 
    const [otobusDurum, setOtobusDurum] = useState(otobusDurumList[0]);
    const [otobusSarj, setOtobusSarj] = useState('');
    const [otobusBaslangicNoktasi, setOtobusBaslangicNoktasi] = useState(otobusBaslangicNoktasiList[0]);

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

    const {id} = useParams("");

    useEffect(() => {
        const getOtobus = async () => {
          try {
            const res = await fetch(`http://localhost:3001/otobusler/${id}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json"
              }
            });
      
            const data = await res.json();
      
            if (res.status === 201) {
              console.log("Veriler başarıyla çekildi.");
              setOtobusPlakaNo(data.otobusPlakaNo);
              setOtobusRuhsatNo(data.otobusRuhsatNo);
              setOtobusKapasite(data.otobusKapasite);
              setOtobusDurum(data.otobusDurum);
              setOtobusSarj(data.otobusSarj);
              setOtobusBaslangicNoktasi(data.otobusBaslangicNoktasi);
            } else {
              console.log("Bir şeyler ters gitti. Lütfen tekrar deneyin.");
            }
          } catch (err) {
            console.log(err);
          }
        };
      
        getOtobus();
    }, [id]);

    const updateOtobus = async (e) => {
        e.preventDefault();

        if (!otobusPlakaNo || !otobusRuhsatNo || !otobusKapasite || !otobusDurum || !otobusSarj) {
            setError("*Lütfen gerekli tüm alanları doldurun.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch(`http://localhost:3001/updateotobus/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "OtobusPlakaNo": otobusPlakaNo, "OtobusRuhsatNo": otobusRuhsatNo, "OtobusKapasite": otobusKapasite,
                                       "OtobusDurum": otobusDurum, "OtobusSarj": otobusSarj, "OtobusBaslangicNoktasi": otobusBaslangicNoktasi
                })
            });

            await response.json();

            if (response.status === 201) {
                alert("Veriler Güncellendi");
                navigate('/otobusler');
            }
            else {
                setError("Bir şeyler ters gitti. Lütfen tekrar deneyin.");
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
            <h1 className=''>Güncellenecek Otobüsün Bilgilerini Girin</h1>
            <div className="mt-5 col-lg-6 col-md-6 col-12">
                <label htmlFor="product_name" className="form-label fs-4 fw-bold">Araç Plakası</label>
                <input type="text" onChange={setPlaka} value={otobusPlakaNo} maxLength={10} className="form-control fs-5" id="otobus_plakaNo" placeholder="Araç Plakasını Girin" required />
            </div>
            <div className="mt-3 col-lg-6 col-md-6 col-12">
                <label htmlFor="product_price" className="form-label fs-4 fw-bold">Araç Ruhsat Numarası</label>
                <input type="number" onChange={setRuhsat} value={otobusRuhsatNo} maxLength={7} className="form-control fs-5" id="otobus_ruhsatNo" placeholder="Araç Ruhsat No" required />
            </div>
            <div className="mt-3 mb-5 col-lg-6 col-md-6 col-12">
                <label htmlFor="product_barcode" className="form-label fs-4 fw-bold">Otobüs Başlangıç Noktası</label>
                <input type="number" onChange={setOtobusBaslangicNoktasi} value={otobusBaslangicNoktasi}  className="form-control fs-5" id="product_barcode" placeholder="Enter Product Barcode" required />
            </div>
            <div className='d-flex justify-content-center col-lg-6 col-md-6'>
                <NavLink to="/otobusler" className='btn btn-primary me-5 fs-4'>Cancel</NavLink>
                <button type="submit" onClick={updateOtobus} className="btn btn-primary fs-4" disabled={loading}>{loading ? 'Updating...' : 'Update'}</button>
            </div>
            
            <div className="col text-center col-lg-6 ">
                {error && <div className="text-danger mt-3 fs-5 fw-bold">{error}</div>}
            </div>
        </div>
    )
}
