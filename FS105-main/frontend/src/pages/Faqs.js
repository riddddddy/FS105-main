import React from 'react'
import { allData } from '../context/AppContext'
import { useContext } from 'react'

const Faqs = () => {

    const { FAQsArray } = useContext(allData)

    console.log(FAQsArray)

    return (
        <>
            <div className="container max-w-4xl mt-10 mb-20">
                <h1 className='text-3xl font-medium text-center mb-10'>FAQs</h1>
                <div>
                    {FAQsArray.map(item => {
                        return (
                            <div key={item.question} className="collapse collapse-arrow bg-base-200 my-5 rounded-none">
                                <input type="radio" name="my-accordion-2" />
                                <div className="collapse-title text-lg font-semibold">
                                    {item.question}
                                </div>
                                <div className="font-normal collapse-content italic">
                                    <p>{item.answer}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
        

    )
}

export default Faqs