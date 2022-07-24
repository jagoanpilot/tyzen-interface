import ERC20_INTERFACE from 'constants/abis/erc20'
import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import priceContracts from 'constants/priceContracts'
import { useMulticallContract } from './useContract'

type ApiResponse = {
  updated_at: string
  data: {
    [key: string]: {
      name: string
      symbol: string
      price: string
      price_BNB: string
    }
  }
}

type yTyzenPriceApiResponse = {
  /* eslint-disable camelcase */
  updated_at: string
  data: {
    name: string
    symbol: string
    price: string
    price_BNB: string
  }
}

export const useGetPriceData = () => {
  const [data, setData] = useState<number>(0)

  const multicallContract = useMulticallContract();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (multicallContract) {
          const { tyzenAddress, busdAddress, bnbAddress, tyzenBnbLpAddress, busdBnbLpAddress } = priceContracts;
          const calls = [
            [tyzenAddress, ERC20_INTERFACE.encodeFunctionData("balanceOf", [tyzenBnbLpAddress])],
            [bnbAddress, ERC20_INTERFACE.encodeFunctionData("balanceOf", [tyzenBnbLpAddress])],
            [busdAddress, ERC20_INTERFACE.encodeFunctionData("balanceOf", [busdBnbLpAddress])],
            [bnbAddress, ERC20_INTERFACE.encodeFunctionData("balanceOf", [busdBnbLpAddress])],
          ];

          const [resultsBlockNumber, result] = await multicallContract.aggregate(calls);
          const [tyzenAmount, bnbAmount1, busdAmount, bnbAmount2] = result.map(r => ERC20_INTERFACE.decodeFunctionResult("balanceOf", r));

          const tyzen = new BigNumber(tyzenAmount);
          const bnb1 = new BigNumber(bnbAmount1);
          const busd = new BigNumber(busdAmount);
          const bnb2 = new BigNumber(bnbAmount2);
          const tyzenPrice = bnb1.div(tyzen).multipliedBy(busd.div(bnb2)).toNumber();

          setData(tyzenPrice)
        }
      } catch (error) {
        console.error('Unable to fetch price data:', error)
      }
    }

    fetchData()
  }, [multicallContract])

  return data
}

export const useGetyTyzenPrice = () => {
  const [data, setData] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      const token = '0x524DC4b2dB22761Bf4dF9cEcF5f25890865C086d'
      const response = await fetch(`https://api.pancakeswap.info/api/v2/tokens/${token}`)
      const parsedData = (await response.json()) as yTyzenPriceApiResponse
      setData(parseFloat(parsedData.data.price))
    }

    fetchData()
  }, [])

  return data
}

export default useGetPriceData
