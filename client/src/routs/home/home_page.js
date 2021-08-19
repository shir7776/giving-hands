import React, {Component} from 'react';

export const Home = () => {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch("/blogs.json")
            .then((res) => res.json())
            .then((data) => setData(JSON.stringify(data)));
    }, []);
    return (
        <div>
            <h2> this is home page through explenation about the majority of everyone's hard
                work</h2>
            <p>{data? data:"bye"}</p>
        </div>
    );
}
//export default Home;