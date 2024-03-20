import { ListItem, UnorderedList } from '@chakra-ui/react'

export default function BulletList(listItems, spacing) {
    return (
        <UnorderedList>
            {listItems.map((item) =>
            (
                <ListItem>{item}</ListItem>
            )
            )}
        </UnorderedList>
    )
}