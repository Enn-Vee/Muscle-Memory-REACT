import React, { useEffect, useState, useRef, useCallback, useContext } from "react";
import {useLocation, useHistory} from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../../contexts/UserContext'
import {Formik, Form, Field} from 'formik'
import "./Exercises.css";
import ExerciseContent from "./ExerciseContent";
import * as QueryString from 'query-string'
import ExerciseSubmission from "../Forms/ExerciseSubmission";

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
        //console.log(e);
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
    <div className="container d-flex flex-wrap align-items-start pt-3">
      <div className=" col-12 col-sm-12 col-md-12 col-lg-3 sticky-xl-top pe-xl-5" style={{marginTop:"64px"}}> {/* FILTER FORM */}
        <div className="mb-3">
          {user ? <ExerciseSubmission /> : null}
        </div>
        <Formik 
        initialValues={{
          max_duration: 60,
          target_muscle: params.target_muscle ? params.target_muscle.split(',') : ["abs", "arms", "back", "legs", "shoulders"],
        }}
        onSubmit = {values => {
          handleSubmit(values);
        }}
        >
          <Form className="">
            <h4 className="text-center">Filter</h4>
            <label htmlFor="duration" className="form-label">Duration: {maxDuration} {parseInt(maxDuration) === 1 ? 'minute' : 'minutes'}</label>
            <Field type="range" className="form-range" name="max_duration" min="1" max="60" step="1"  onInput={e => handleDurationChange(e)}/>
            <div id="checkbox-group">Muscle Group: </div>
            <div role="group" aria-labelledby="checkbox-group" className="ps-2 mb-2">
                <div className="form-check">
                  <Field type="checkbox" name="target_muscle" value="abs" className="form-check-input" />
                    <label className="form-check-label">
                      Abs
                    </label>
                </div>
                  <div className="form-check">
                    <Field type="checkbox" name="target_muscle" value="arms" className="form-check-input" />
                    <label className="form-check-label">
                    Arms
                  </label>
                </div>
                <div className="form-check">
                    <Field type="checkbox" name="target_muscle" value="back" className="form-check-input" />
                    <label className="form-check-label">
                    Back
                  </label>
                </div>
                <div className="form-check">
                    <Field type="checkbox" name="target_muscle" value="legs" className="form-check-input" />
                    <label className="form-check-label">
                    Legs
                  </label>
                </div>
                  <div className="form-check">
                    <Field type="checkbox" name="target_muscle" value="shoulders" className="form-check-input" />
                    <label className="form-check-label">
                    Shoulder
                  </label>
                </div>
            </div>
            <label htmlFor="sort" className="form-label">Sort by:</label>
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
            <div className="text-center">
              <button className="btn btn-primary" type="submit">Apply</button>
            </div>

          </Form>
        </Formik>
      </div> {/* END OF FILTER FORM */}
      <div className="col-12 col-sm-12 col-md-12 col-lg-9 col-xl-9 col-xxl-9">
        <h2 className="mb-4">Exercises</h2>
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
