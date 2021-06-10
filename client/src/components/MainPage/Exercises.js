import React, { useEffect, useState, useRef, useCallback, useContext } from "react";
import {useLocation, useHistory} from 'react-router-dom'
import axios from 'axios'
import ExerciseSubmissionModal from "../Forms/ExerciseSubmissionModal";
import { UserContext } from '../../contexts/UserContext'
import {Formik, Form, Field} from 'formik'
import "./Exercises.css";
import ExerciseContent from "./ExerciseContent";
import * as QueryString from 'query-string'

function Exercises() {
  const {search} = useLocation();
  const [maxDuration, setMaxDuration] = useState(60);
  const [params, setFilters] = useState(QueryString.parse(search));
  const [exercises, setExercises] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [hasMore, setHasMore] = useState(true);
  const history = useHistory();
  const lastExerciseRef = useRef();
  const { user }  = useContext(UserContext);

  const lastExerciseCallBack = useCallback(element => {
    if(lastExerciseRef.current) //Has a reference
      lastExerciseRef.current.disconnect()//Remove reference
    lastExerciseRef.current = new IntersectionObserver(entries => { 
      if(entries[0].isIntersecting && hasMore)
        setPage(page => page + 1);
    })
    if (element)
      lastExerciseRef.current.observe(element);
  }, [hasMore])

  useEffect(() => {
    let query = {
      ...params,
      page,
      limit
    }
    let queryString = "?"+ new URLSearchParams(query).toString();
    let cancel
    axios({
        method: 'GET',
        url: `http://localhost:3001/exercises${queryString}`,
        cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
        setExercises(exercises => exercises.concat(res.data))
        setHasMore(res.data.length);
    }).catch(e => {
        console.log(e);
    })
    return () => cancel()
  }, [page, params])

  useEffect(() => {
    setExercises([]);
  }, [params])

  useEffect(() => {
    setFilters(QueryString.parse(search))
  }, [search])


  const handleSubmit = (values) => {
    for(const key in values)
      if(values[key].length === 0 || values[key] === '')
        delete values[key];
    if(values.sortOrder) {
      values.sortOrder.replace("\\", "")
      values.sortOrder = JSON.parse(values.sortOrder)
      values.sort = values.sortOrder.sort
      values.order = values.sortOrder.order
      delete values.sortOrder
    }
    let query = "?" + new URLSearchParams(values);
    history.push({
      pathname: '/main',
      search: query
    })
    setPage(1); 
  }

  const handleDurationChange = (e) => {
    e.preventDefault()
    setMaxDuration(e.target.value);
  }

  return (
    <div className="container d-flex flex-wrap align-items-start pt-5">
      <div className=" col-12 col-sm-12 col-md-12 col-lg-12 col-xl-3 col-xxl-3 sticky-xl-top pe-xl-5"> {/* FILTER FORM */}
        {user ? <ExerciseSubmissionModal /> : null}
        <Formik 
        initialValues={{
          max_duration: 60,
          target_muscle: ["abs", "arms", "back", "legs", "shoulders"],
        }}
        onSubmit = {values => {
          handleSubmit(values);
        }}
        >
          <Form className="">
            <h4 className="text-center">Filter</h4>
            <label>Duration</label>
            <Field type="range" className="form-range" name="max_duration" min="1" max="60" step="1"  onInput={e => handleDurationChange(e)}/>
            <small className="text-center">{maxDuration}</small>
            <div id="checkbox-group">Checked</div>
            <div role="group" aria-labelledby="checkbox-group">
              <label>
                <Field type="checkbox" name="target_muscle" value="abs" />
                Abs
              </label>
              <label>
                <Field type="checkbox" name="target_muscle" value="arms"/>
                Arms
              </label>
              <label>
                <Field type="checkbox" name="target_muscle" value="back"/>
                Back
              </label>
              <label>
                <Field type="checkbox" name="target_muscle" value="legs"/>
                Legs
              </label>
              <label>
                <Field type="checkbox" name="target_muscle" value="shoulders"/>
                Shoulder
              </label>
              <label htmlFor="sort">Sort by:</label>
              <Field as="select" name="sortOrder" className="form-select">
                <option value='{"sort": "created_at", "order": "desc"}'>Newest</option>
                <option value='{"sort": "created_at", "order": "asc"}'>Oldest</option>
                <option value='{"sort": "likes", "order": "desc"}'>Most Liked</option>
                <option value='{"sort": "likes", "order": "asc"}' >Least Liked</option>
                <option value='{"sort": "duration", "order": "asc"}' >Duration(Shortest-Longest)</option>
                <option value='{"sort": "duration", "order": "desc"}' >Duration(Longest-Shortest)</option>
                <option value='{"sort": "title", "order": "asc"}' >Title(A-Z)</option>
                <option value='{"sort": "title", "order": "desc"}' >Title(Z-A)</option>
                <option value='{"sort": "author", "order": "asc"}' >Author Name(A-Z)</option>
                <option value='{"sort": "author", "order": "desc"}' >Author Name(Z-A)</option>
                <option value='{"sort": "difficulty", "order": "asc"}' >Least Difficult</option>
                <option value='{"sort": "difficulty", "order": "desc"}' >Most Difficult</option>
              </Field >
              <hr />
              <button type="submit">Filter</button>
           </div>
          </Form>
        </Formik>
      </div> {/* END OF FILTER FORM */}
      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-9 col-xxl-9">
        <nav>
          <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
            <button
              className="nav-link active"
              id="all-tab"
              data-bs-toggle="tab"
              data-bs-target="#all"
              type="button"
              role="tab"
              aria-controls="all"
              aria-selected="true"
            >
              All
            </button>
          </div>
        </nav>
        <div>
            <div>
              {exercises ? exercises.map((exercise, index) => {
                if(exercises.length === index + 1) {
                  return (
                    <div ref={lastExerciseCallBack}> 
                      <ExerciseContent exercise={exercise} />
                    </div>
                  );
                }
                else {
                  return(
                    <div>
                        <ExerciseContent exercise={exercise} />
                    </div>
                  );
                }
              }) : null}
            </div>
          </div>
      </div>
    </div>
  );
}

export default Exercises;
