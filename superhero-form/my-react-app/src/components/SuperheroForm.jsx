import {useState} from "react";

export const SuperheroForm = () => {

    const powerSourceOptions = [
        'Bitten by a strange creature',
        'Radioactive exposure',
        'Science experiment',
        'Alien heritage',
        'Ancient artifact discovery',
        'Other'
    ];

    const powersOptions = [
        'Super Strength',
        'Super Speed',
        'Flight',
        'Invisibility',
        'Telekinesis',
        'Other'
    ];

    const [heroName, setHeroName] = useState('');
    const [realName, setRealName] = useState('');
    const [powerSource, setPowerSource] = useState('');
    const [powers, setPowers] = useState([]);

    const handlePowersChange = e => {
        const { value, checked } = e.target;
        setPowers(checked ? [...powers, value] : powers.filter(p => p !== value));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`
        Your Hero name: ${heroName} 
        Your real name: ${realName} 
        Where did you get your power: ${powerSource} 
        Your powers: ${powers}`);
    }

    return (
        <div className='form-wrap'>
            <h2>Superhero Application Form</h2>
            <p>Please complete all fields</p>
            <form method='post' action='https://superhero-application-form.freecodecamp.org' onSubmit={handleSubmit}>
                <div className='section'>
                    <label>
                        Hero Name
                        <input
                            type='text'
                            value={heroName}
                            onChange={e => setHeroName(e.target.value)}
                        />
                    </label>
                    <label>
                        Real Name
                        <input
                            type='text'
                            value={realName}
                            onChange={e => setRealName(e.target.value)}
                        />
                    </label>
                </div>
                <label className='section column'>
                    How did you get your powers?
                    <select value={powerSource} onChange={e => setPowerSource(e.target.value)}>
                        <option value=''>
                            Select one
                        </option>
                        {powerSourceOptions.map(source => (
                            <option key={source} value={source}>
                                {source}
                            </option>
                        ))}
                    </select>
                </label>
                <label className='section column'>
                    List your powers (select all that apply):

                    {powersOptions.map(power => (
                        <label key={power}>
                            <input
                                type='checkbox'
                                value={power}
                                checked={powers.includes(power)}
                                onChange={handlePowersChange}
                            />
                            <span>{power}</span>
                        </label>
                    ))}
                </label>
                <button
                    className='submit-btn'
                    type='submit'

                >
                    Join the League
                </button>
            </form>
        </div>
    )
};