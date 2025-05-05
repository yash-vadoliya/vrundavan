import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./style.css";

function Home() {
    const [records, setRecords] = useState([]);
    const navigate = useNavigate();

    // List of product categories
    const products = [
        "Peda", "Traditional Barfi", "Traditional Sweet", "Designer Sweet", "Dryfruit Sweet",
        "ShriKhand", "Liquid Sweets", "Others"
    ];

    useEffect(() => {
        axios
            .get("http://192.168.1.8:5000/vrundavan/product")
            .then((res) => {
                console.log(res.data);
                setRecords(res.data[0]); // ✅ Set all data instead of res.data[0]
            })
            .catch((err) => console.error("Error fetching products:", err));
    }, []);

    return (
        <>
            {/* Swiper Carousel */}
            <div className="my-carousel" >
            <Swiper
                    spaceBetween={10}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 1000, disableOnInteraction: false }} // Auto slide every 2 sec
                    loop={true}
                    modules={[Autoplay, Pagination]}
                    className="mySwiper"
                    breakpoints={{
                        320: { slidesPerView: 1 }, // 1 slide on small screens (phones)
                        576: { slidesPerView: 2 }, // 2 slides on small tablets
                        768: { slidesPerView: 3 }, // 3 slides on medium devices
                        1024: { slidesPerView: 4 }, // 4 slides on larger screens
                    }}
                    style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}
                >
                    {records.map((list, index) => (
                        <SwiperSlide key={index} className="my-slide">
                            <div className="my-card">
                                <img src={`http://192.168.1.8:5000/images/${list.image_url}`} alt={list.product_name} />
                                {/* <h4>{list.title}</h4> */}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>

            {/* Description Section */}
            <div className="my-5">
                <div className="fs-2 text-justify p-4" style={{color: "#224e68", backgroundColor: "#98B9F2" }}>
                    <p>
                        <strong>Vrundavan Dairy Farm</strong>, located in Junagadh, Gujarat, is a well-established dairy farm known for its high-quality dairy products. We specialize in producing fresh milk, ghee, paneer, and other dairy items while maintaining the highest hygiene standards.
                    </p>
                    <p>
                        Our commitment to sustainable and ethical dairy farming ensures our cows are well-fed, healthy, and cared for, resulting in pure and nutritious products.
                    </p>
                    <p>
                        By integrating modern techniques with traditional values, Vrundavan Dairy Farm has earned a reputation as a trusted source for dairy products in Gujarat.
                    </p>
                </div>
            </div>

            {/* Product Categories */}
            <div className="container home-card" >
                <div className="text-center text-dark"><h2>OUR PRODUCTS</h2></div>

                <div className="row">
                    {products.map((product, index) => {
                        const filteredRecords = records.filter((list) =>
                            list.category?.toLowerCase() === product.toLowerCase() // ✅ Case-insensitive match
                        );

                        return (
                            <div key={index} className="col-md-3 mt-3 card">
                                <h4 style={{ color: "#1D3E55" }}>{product}</h4>
                                <hr style={{ color: "#1D3E55", border: "1px solid #1D3E55" }} />
                                <ul style={{ color: "#224e68" }}>
                                    {filteredRecords.length > 0 ? (
                                        filteredRecords.map((list, idx) => (
                                            <li key={idx}>{list.product_name}</li>
                                        ))
                                    ) : (
                                        <li>No products available</li>
                                    )}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default Home;
