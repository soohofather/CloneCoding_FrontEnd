import React, {useEffect, useRef, useState} from 'react';
import {getOne} from "../../api/productsApi";
import FetchingModal from "../common/FetchingModal";
import {API_SERVER_HOST} from "../../api/todoApi";

const initState = {
    pno:0,
    pname: '',
    pdesc: '',
    price: 0,
    delflag:false,
    uploadedFileNames: []
}

const host = API_SERVER_HOST

function ModifyComponent({pno}) {

    const [product, setProduct] = useState(initState)

    const [fetching, setFetching] = useState(false)

    const uploadRef = useRef()

    useEffect(() => {

        setFetching(true)

        getOne(pno).then(data => {
            setProduct(data)
            setFetching(false)
        })

    }, [pno]);

    const handleChangeProduct = (e) => {
        product[e.target.name] = e.target.value

        setProduct({...product})
    }

    const deleteOldImages = (imageName) => {

        const resultFileNames = product.uploadedFileNames.filter(fileName => fileName !== imageName)

        product.uploadedFileNames = resultFileNames

        setProduct({...product})

    }


    return (
            <div className="border-2 border-sky-200 mt-10 m-2 p-4">
                {fetching ? <FetchingModal/> : <></>}

                <div className="flex justify-center">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <div className="w-1/5 p-6 text-right font-bold">Product
                            Name
                        </div>
                        <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                               name="pname"
                               type={'text'}
                               value={product.pname}
                               onChange={handleChangeProduct}
                        >
                        </input>

                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <div className="w-1/5 p-6 text-right font-bold">Desc</div>
                        <textarea
                                className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
                                name="pdesc"
                                rows="4"
                                onChange={handleChangeProduct}
                                value={product.pdesc}>
            {product.pdesc}
          </textarea>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <div className="w-1/5 p-6 text-right font-bold">Price</div>
                        <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                               name="price"
                               type={'number'}
                               value={product.price}
                               onChange={handleChangeProduct}
                        >
                        </input>
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <div className="w-1/5 p-6 text-right font-bold">DELETE</div>
                        <select
                                name="delFlag" value={product.delFlag}
                                onChange={handleChangeProduct}
                                className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md">
                            <option value={false}>사용</option>
                            <option value={true}>삭제</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <div className="w-1/5 p-6 text-right font-bold">Files</div>
                        <input ref={uploadRef}
                               className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                               type={'file'} multiple={true}
                        >
                        </input>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                        <div className="w-1/5 p-6 text-right font-bold">
                            Images
                        </div>
                        <div className="w-4/5 justify-center flex flex-wrap items-start">

                            {/* 조건부 렌더링 추가 */}
                            {product.uploadedFileNames && Array.isArray(product.uploadedFileNames) && product.uploadedFileNames.length > 0 ? (
                                    product.uploadedFileNames.map((imgFile, i) =>
                                    <div
                                            className="flex justify-center flex-col w-1/3"
                                            key={i}>
                                        <button
                                                className="bg-blue-500 text-3xl text-white"
                                                onClick={() => deleteOldImages(imgFile)}
                                        >DELETE</button>
                                        <img
                                                alt="img"
                                                src={`${host}/api/products/view/s_${imgFile}`}/>

                                    </div>
                                    )) : (
                                            <div className="w-full text-center">No images available</div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
    );
}

export default ModifyComponent;