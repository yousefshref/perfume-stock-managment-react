import { Box, Drawer } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import OilContext from '../../contexts/OilContext'

const CreateOrUpdateOilType = ({open, onClose}) => {
    const {
        name, setName,
        quantity_grams, setQuantityGrams,
        addOil,
        updateOil,

        updateOilObj, 
    } = useContext(OilContext)

  return (
    <Drawer open={open} onClose={onClose}>
        <Box sx={{ width: 350 }} className="p-5">
            <p className='normal-font-bold text-xl tracking-widest'>{updateOilObj?.id ? "Update" : "Create"} an <span className='text-amber-700'>Oil Type</span></p>
            <form onSubmit={(e) => {
                e.preventDefault() 
                if(updateOilObj?.id){
                    updateOil().then((e) => {
                        if(e){
                            onClose()
                        }
                    })
                }else{
                    addOil().then((e) => {
                        if(e){
                            onClose()
                        }
                    })
                }
            }} className='flex flex-col gap-3 mt-6'>
                <div className='flex flex-col'>
                    <p>Name</p>
                    <input placeholder='Type Name, Ex: Gardenia' type="text" className='p-2 outline-none border-b transition-all hover:border-b-amber-700 focus:border-b-amber-700' value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className='flex flex-col mt-10'>
                    <p>Quantity in Grams</p>
                    <div className='w-full flex flex-row justify-center items-center gap-5'>
                        <input placeholder='Stock Quantity' type="number" className='p-2 w-full outline-none border-b transition-all hover:border-b-amber-700 focus:border-b-amber-700' value={quantity_grams} onChange={e => setQuantityGrams(e.target.value)} />
                        <p className='text-3xl text-amber-700 my-auto'>G</p>
                    </div>
                </div>
                <button className='mt-10 w-fit tracking-widest bg-green-700 transition-all hover:bg-green-800 active:bg-green-700 text-white p-1.5 px-3'>{updateOilObj?.id ? "UPDATE" : "CREATE"}</button>
            </form>
        </Box>
    </Drawer>
  )
}

export default CreateOrUpdateOilType
