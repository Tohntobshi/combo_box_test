import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

interface IItem {
    id: number;
    text: string;
    icon: string;
}

const items: IItem[] = [
    {id: 1, text: 'Apple', icon: '🍎'},
    {id: 2, text: 'Banana', icon: '🍌'},
    {id: 3, text: 'Blueberry', icon: '🫐'},
    {id: 4, text: 'Mango', icon: '🥭'},
]

interface IProps {
    items: IItem[];
    searchText: string;
    onSearchTextChange: (val: string) => void;
    chosenItem: IItem | undefined;
    onItemChange: (val: IItem) => void;
}

function ComboBox(props: IProps) {
    return <div>
        todo
    </div>
}

function App() {
    const [searchText, setSearchText] = useState('')
    const [chosenItem, setChosenItem] = useState<IItem | undefined>()
    const filteredItems = items.filter(el => el.text.includes(searchText))

    return <div className='abc'>
        <ComboBox
            items={filteredItems}
            searchText={searchText}
            chosenItem={chosenItem}
            onSearchTextChange={setSearchText}
            onItemChange={setChosenItem}
        />
    </div>
}

const root = createRoot(document.getElementById('root')!)
root.render(<App />)