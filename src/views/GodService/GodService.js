import { TemperatureSlider } from '../../components/TemperatureSlider';
import { Image, Box, Table, Td, Thead, Tr, Th, Tbody } from '@chakra-ui/react';
import hand from './hand.png';
import { Link } from 'react-router-dom';
import './GodService.scss';
import { useState } from 'react';

export const GodService = () => {
  const temperatureObj = [
    { date: 'Sat, 15 Jan 2022 17:20:51 GMT', temperature: 29 },
    { date: 'Sat, 8 Jan 2022 16:20:01 GMT', temperature: 35 },
    { date: 'Sat, 1 Jan 2022 08:20:12 GMT', temperature: 50 },
  ];
  const [temperature, setTemperature] = useState(
    JSON.parse(localStorage.getItem('temp')) || temperatureObj
  );

  const handleChange = (temp) => {
    setTemperature((oldTemp) => [temp, ...oldTemp]);
    localStorage.setItem('temp', JSON.stringify([temp, ...temperature]));
  };

  return (
    <Box h='110vh' bg='brand.darker'>
      <Box p='5'>
        <Link
          to='/'
          style={{
            color: '#bbe6e4',
            textTransform: 'uppercase',
            zIndex: '1000',
            position: 'relative',
          }}
        >
          Come down to earth
        </Link>
      </Box>
      <Box
        boxSize='1000px'
        ml='-105px'
        mt='-205px'
        position='absolute'
        transform='rotate(-40deg)'
      >
        <Image src={hand} zIndex='1' />
      </Box>
      <Box
        w='30%'
        height='400px'
        overflowX='scroll'
        position='absolute'
        bottom='0'
        left='50%'
        transform='translate(-50%, -50%)'
      >
        <Table variant='striped' colorScheme='blue' overflow='scroll'>
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th isNumeric>Temperature</Th>
            </Tr>
          </Thead>
          <Tbody>
            {temperature.map((t) => (
              <Tr>
                <Td>{t.date}</Td>
                <Td isNumeric>{t.temperature}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <div class='speech bubble'>
        <span className='title'>Drag me!</span>
      </div>
      <TemperatureSlider handleChange={handleChange} />
    </Box>
  );
};
