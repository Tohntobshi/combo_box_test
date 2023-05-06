import React, { useEffect, useRef, useState } from 'react'
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
    placeholder: string;
    items: IItem[];
    searchText: string;
    onSearchTextChange: (val: string) => void;
    chosenItem: IItem | undefined;
    onItemChange: (val: IItem) => void;
}

function ComboBox({ placeholder, chosenItem, searchText, onSearchTextChange,
    items, onItemChange }: IProps) {
    const [isOpen, setIsOpen] = useState(false)
    const inputRef = useRef<HTMLInputElement | null>(null)
    useEffect(() => {
        if (!isOpen) return
        const onDocumentClick = () => {
            setIsOpen(false)
        }
        window.addEventListener('click', onDocumentClick)
        return () => window.removeEventListener('click', onDocumentClick)
    }, [isOpen])
    const onOpenButtonClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        setIsOpen(true)
        setTimeout(() => inputRef.current?.focus(), 100)
    }
    const onOpenContainerClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
    }
    const onItemClick = (item: IItem) => {
        onItemChange(item)
        setIsOpen(false)
    }
    return <div className='comboBoxContainer'>
        <div className='openButton' onClick={onOpenButtonClick}>
            {chosenItem ?
                <span className='chosenText'>{chosenItem.text}</span> :
                <span className='placeholder'>{placeholder}</span>
            }
            <img src='down-arrow.svg' className='arrowDown'/>
        </div>
        {isOpen && <div
            className='openContainer'
            onClick={onOpenContainerClick}>
            <div className='inputContainer'>
                <input
                    placeholder={placeholder}
                    value={searchText}
                    onChange={e => onSearchTextChange(e.target.value)}
                    className='input'
                    ref={inputRef}
                />
                <img src='down-arrow.svg' className='arrowDown'/>
            </div>
            <div className='listContainer'>
                {items.map(el => <div key={el.id} className='listElement'
                    onClick={() => onItemClick(el)}>
                    <span className='icon'>{el.icon}</span>
                    <span>{el.text}</span>
                </div>)}
            </div>
        </div>}
    </div>
}

function App() {
    const [searchText, setSearchText] = useState('')
    const [chosenItem, setChosenItem] = useState<IItem | undefined>()
    const filteredItems = items.filter(el =>
        el.text.toLowerCase().includes(searchText.toLowerCase()))

    return <div className='rootContainer'>
        <ComboBox
            placeholder='Choose a Fruit:'
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