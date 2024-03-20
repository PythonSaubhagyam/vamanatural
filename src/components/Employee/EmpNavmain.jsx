import { CalendarIcon } from '@chakra-ui/icons'
import { Flex, Button, ButtonGroup } from '@chakra-ui/react'

function EmpNavmain() {
  return (
    <>
      <Flex justify='flex-end' align='center' gap='2' borderBottom={'1px'} borderColor={'gray'}>
        <ButtonGroup gap='2'>
          <Button color='gray' bg={'white'} _hover={'white'}
            borderLeft='1px' borderLeftColor='gray.400'
            borderRadius={0}>
            <CalendarIcon me={2} />Timesheets
          </Button>
        </ButtonGroup>
      </Flex>
    </>
  )
}

export default EmpNavmain