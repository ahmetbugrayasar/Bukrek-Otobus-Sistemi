import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Otobusler() {

    useEffect(() => {
        getOtobus();
    }, [])

    const [otobusData, setOtobusData] = useState([]);

    const getOtobus = async (e) => {

        try {
            const res = await fetch("http://localhost:3001/otobusler", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();

            if (res.status === 201) {
                console.log("Data Retrieved.");
                setOtobusData(data);
            }
            else {
                console.log("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const deleteOtobus = async (id) => {

        const response = await fetch(`http://localhost:3001/deleteotobus/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await response.json();
        console.log(deletedata);

        if (response.status === 422 || !deletedata) {
            console.log("Error");
        } else {
            console.log("Otobüs Silindi");
            getOtobus();
        }

    }

    return (
        <>


            <div className='container-fluid p-5'>
                <h1>Otobüs Envanteri</h1>
                <div className='add_button'>
                    <NavLink to="/insertotobus" className='btn btn-primary fs-5'> + Yeni Otobüs Ekle</NavLink>
                </div>
                <div className="overflow-auto mt-3" style={{ maxHeight: "38rem" }}>
                    <table className="table table-striped table-hover mt-3 fs-5">
                        <thead>
                            <tr className="tr_color">
                                <th scope="col">#</th>
                                <th scope="col">Durum</th>
                                <th scope="col">Şarj Durumu</th>
                                <th scope="col">Plaka</th>
                                <th scope="col">Ruhsat</th>
                                <th scope="col">Başlangıç Noktası</th>
                                <th scope="col">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                otobusData.map((element, id) => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">{id + 1}</th>
                                                <td>{element.OtobusDurum}</td>
                                                <td>{element.OtobusSarj}</td>
                                                <td>{element.OtobusPlakaNo}</td>
                                                <td>{element.OtobusRuhsatNo}</td>
                                                <td>{element.OtobusBaslangicNoktasi}</td>
                                                

                        
                                                <td><button className="btn btn-danger" onClick={() => deleteOtobus(element._id)}><i class="fa-solid fa-trash"></i></button></td>

                                            </tr>
                                        </>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>

            </div>

        </>
    )
}
