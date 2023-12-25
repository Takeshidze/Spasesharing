import React, {useState, useEffect} from 'react';
import { Button, Header, SelectBuilding, Spinner} from "components";
// import { loadFreeTime } from 'repo/loadFreeTime';
// import { uploadScheduleSelect } from 'repo/uploadScheduleSelect';
import { Link } from 'react-router-dom';
import { getAudienceBuilding } from 'repo/getAudienceBuilding';
import { getAudienceBuildingFilter } from 'repo/getAudienceBuildingFilter';

const EditAudiences = () => {

  const [audiences, setAudiences] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAudience();
  }, [])


  const fetchAudience = async () => {
    setIsLoading(true);
    // Получаем все аудиенции
    try {
      const res = await getAudienceBuilding();
      setAudiences(res);
      console.log(audiences);
    } catch (err) {
      console.error(`Error: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async (building_id) => {
    setIsLoading(true)
    // Получаем строения
    try {
      // using await to make async code look sync and shorten 
      const res = await getAudienceBuildingFilter(building_id);
      setAudiences(res);
    } catch (err) {
      console.error(`Error: ${err}`);
      // setting the error state
    } finally {
      setIsLoading(false);
    }
  };
  



  return (
    <>
    <div className="bg-grey-bg font-sourcesanspromx-auto pb-[27px] px-[27px] md:px-[0px] relative w-full">
        <div className="font-inter flex items-center justify-center h-[100vh]  max-w-[1360px] mx-auto w-full z-[1] body-login">
        <Header>
            
            </Header>

          <main className="main-block mt-10">
            <div className="login-box-table sm:w-[100%] px-[40px] py-[20px] sm:px-[0px]" >
              <div className='flex flex-row gap-10'>
                <SelectBuilding fetchData={fetchData}></SelectBuilding>
              </div>
              
              <table className='table-res h-[500px] sm:max-w-[457px] md:mx-auto md:max-w-[571px]'>
                <thead>
                  <tr>
                      <th className='table-th-left px-[20px] md:px-[15px] sm:px-[10px] py-[20px]'>
                        №
                      </th>
                      <th className='border-t-0 px-[70px] md:px-[15px] sm:px-[10px]'>
                        Аудитория
                      </th>
                      <th className='border-t-0 md:px-[50px] sm:px-[30px]'>
                       Корпус
                      </th>
                      <th className={'table-th-right  px-[170px] ' + (audiences.length > 6 ? "rounded-none" : '')}>
                        Действия
                      </th>
                  </tr>
                  
                </thead>
                <tbody>
                  {isLoading 
                    ? <tr><td colSpan="4" className='border-r-0'><Spinner height={400}></Spinner></td></tr>
                    : audiences.map((row, index) => (
                      <tr key={row.id}>
                        <td className={'border-l-0 '}>{index + 1}</td>
                        <td className=''>{row.audience_name}</td>
                        <td className=''>{row.building.name}</td>
                        <td className='border-r-0 '>
                          <Link to={"/detailsAudience"}>
                            <button className='white-button mr-[10px]'>Подробнее</button>
                          </Link>
                          <button className='white-button mr-[10px]'>Редактировать</button>
                          <button className='delete-button'>Удалить</button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>

              <div className='flex flex-row justify-end mt-[20px] items-center fotter-block'>
                <div className='flex flex-row gap-5'>
                  <Button className='px-[40px] text-[18px]'>Сделать PDF отчет</Button>
                  <Link to={"/createaudience"}>
                    <Button className='px-[40px] text-[18px]'>Добавить</Button>
                  </Link>
                </div>
              </div>

            </div>
          </main>
        </div>
    </div>
    </>);
  
}

export default EditAudiences;