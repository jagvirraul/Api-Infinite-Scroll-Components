import React, { useState, useEffect } from 'react';
import './style.scss';
import { Table } from 'reactstrap';
import axios from 'axios';
import InfiniteScroll from "react-infinite-scroll-component";
const App = () => {
    const [items, setItems] = useState([]);
    const [pageNo, setPageNo] = useState(0);
    const getData = (page) => {
        if (page < 50)
            axios.get(` https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`)
                .then((response) => {
                    setPageNo(page + 1)
                    console.log("response", response.data);
                    setItems((prev) => prev.concat(response.data.hits));
                })
                .catch((error) => {
                    console.log(error.message)
                });
    }
    useEffect(() => {
        setInterval(getData(0), 10000);
        clearInterval(getData(50))
    }, []);
    return (
        <div className="main">
            <div className="main-container">
                <div className="heading">
                    <h1>API DATA</h1>
                </div>
                <div className="infinte-scroll-container">
                    <InfiniteScroll
                        dataLength={items.length}
                        next={() => getData(pageNo)}
                        hasMore={true}
                        loader={<h4>Loading...</h4>}
                        height={500}
                    >
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>URL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((elem, index) => {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{index}</th>
                                            <td>{elem.title}</td>
                                            <td>{elem.author}</td>
                                            <td>{elem.url}</td>
                                        </tr>
                                    );
                                }
                                )}
                            </tbody>
                        </Table>
                    </InfiniteScroll>
                </div>
            </div>
        </div>
    )
}

export default App;

