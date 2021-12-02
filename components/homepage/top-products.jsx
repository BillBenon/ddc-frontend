import styles from "../../styles/components/welcomePage.module.css";
import {Swiper, SwiperSlide} from "swiper/react";
import {useEffect, useState} from "react";
import Product from "../reusable/Product";
import ProductService from "../../services/products/ProductService";
import {Cursors} from "../reusable/scrollor-cursors";


const Products = ({loading, setCurrentSlide, breakPoints, jumpToSlide, currentSlide, products}) => {
    return (
        <div
            className={`p-0  mt-3 products-area pb-5  ${styles.products}`}
        >
            {loading ? (
                <div
                    className="row row-cols-1 row-cols-xs-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 row-cols-xl-6">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="col p-2 top-products">
                            <div className="rounded py-0 bg-whiterounded">
                                <div className="loading h-100 rounded-top my-0 p-0"/>
                                <div className="prod-desc py-2 px-3">
                                    <p className="h-10 loading col-10"/>
                                    <p className="loading h-10 mt-0 col-8"/>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <Swiper
                    className={"popular-products-swiper"}
                    slidesPerView={1}
                    breakpoints={breakPoints}
                    onSlideChange={(swiper) =>
                        setCurrentSlide(swiper.activeIndex)
                    }
                    onSwiper={(swiper) => true}
                    spaceBetween={1}
                >
                    {products.map((item) => (
                        <SwiperSlide>
                            <Product product={item}
                                     productOnMarketId={item?._id}
                                     image={item.product?.imageUrls[0]}
                                     price={item?.unit_price}/>

                            {/*<div*/}
                            {/*    className={*/}
                            {/*        "card border-0 pt-3 pb-2 col " + styles.container*/}
                            {/*    }*/}
                            {/*    key={item}*/}
                            {/*>*/}
                            {/*    <img*/}
                            {/*        src="images/perfume.jpg"*/}
                            {/*        alt="perfume"*/}
                            {/*        className={`rounded ${styles.right_top_prod_img}`}*/}
                            {/*    />*/}
                            {/*    <h>Body spray</h>*/}
                            {/*    <button*/}
                            {/*        style={{*/}
                            {/*            border: "none",*/}
                            {/*            fontSize: "13px",*/}
                            {/*            backgroundColor: "#EBEBEB",*/}
                            {/*            color: "#898888 !important",*/}
                            {/*        }}*/}
                            {/*        className={"btn text-white border-none "}*/}
                            {/*        onClick={() => Router.push("/auth/register")}*/}
                            {/*    >*/}
                            {/*        Body care*/}
                            {/*    </button>*/}
                            {/*</div>*/}
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>

    )
}


const TopProducts = () => {

    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(false);

    const breakPoints = {
        200: {
            slidesPerView: 1.25,
        },
        800: {
            slidesPerView: 3,
        },
        900: {
            slidesPerView: 4,
        },
        1300: {
            slidesPerView: 5.2,
        },
    };

    const jumpToSlide = (slideNumber) => {
        const swiper = document.querySelector(".popular-products-swiper").swiper;
        swiper.slideTo(slideNumber, 1000, false);
    };

    const [products, setProducts] = useState([]);

    useEffect(() => {
        ProductService.getAllProductsOnMarket()
            .then((res) => {
                setProducts(res.data)
            }).catch(e => console.log(e))
    }, [])

    return (
        <div className={"container pt-5"}>
            <div className={"row justify-content-between"}>
                <div className={"col-5"}>
                    <h5>Top products</h5>
                    <Cursors currentSlide={currentSlide} jumpToSlide={jumpToSlide}/>
                </div>
                {/*<div className={"col-3"}>*/}
                {/*    <h6>Skin care</h6>*/}
                {/*</div>*/}
            </div>
            <div className={"row justify-content-center"}>
                <div className={"col-12"}>
                    <Products loading={loading} setCurrentSlide={setCurrentSlide} breakPoints={breakPoints}
                              currentSlide={currentSlide} jumpToSlide={jumpToSlide} products={products}/>
                </div>
            </div>
        </div>
    )
}


export default TopProducts;