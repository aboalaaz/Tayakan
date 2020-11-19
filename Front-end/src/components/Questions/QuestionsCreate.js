import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { USER_SERVER } from '../Config';
import axios from 'axios';
import Switch from 'react-bootstrap-switch';

import Select from 'react-select';
import {
  FormGroup,
  Label,
  Badge,
  Modal,
  Container,
  Input,
  Row,
  Col,
} from 'reactstrap';
import GridItem from '../Grid/GridItem';

import Card from '../Card/Card.js';
import CardHeader from '../Card/CardHeader.js';
import GridContainer from '../Grid/GridContainer.js';

import { Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import SearchBar from '../SearchBar';
import { clearSubmit } from 'redux-form';

import TextField from '@material-ui/core/TextField';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';

const filter = createFilterOptions();

const useStyles = makeStyles(styles);
function QuestionsCreate() {
  const user = useSelector((state) => state.user);
  const [value, setValue] = React.useState(null);
  const [smallAlert, setSmallAlert] = React.useState(false);
  const [coursedelete, setCourseDelete] = React.useState();

  const classes = useStyles();
  const [successSelect, setSuccessSelect] = React.useState(null);
  const [successSelectChapter, setSuccessSelectChapter] = React.useState(null);
  const [successSelectMajor, setSuccessSelectMajor] = React.useState(null);
  const [successSelectCourse, setSuccessSelectCourse] = React.useState(null);
  const [optionsMajor, setOptionsSelectMajor] = React.useState([]);
  const [optionsCourses, setOptionsCourses] = React.useState([]);
  const [optionsChapter, setOptionsChapter] = React.useState([]);
  const [Question, setQuestion] = React.useState('');
  const [answer, setAnswer] = React.useState('');
  const [wrong1, setWrong1] = React.useState('');
  const [wrong2, setWrong2] = React.useState('');
  const [wrong3, setWrong3] = React.useState('');
  const [searQust, setSearQust] = React.useState('');
  const [ans, setAns] = React.useState(false);
  const [flabBlank, setAFlagBlank] = React.useState(false);
  const [updateFlag, setUpdateFlag] = React.useState(false);

  const [allQuestions, setAllQuestions] = React.useState([]);

  const [selectedWord, setSelectedWord] = React.useState('');

  //قائمة انواع الاساله
  const selectOptions = [
    { value: '0', label: ' Choose Question Type', isDisabled: true },
    { value: '1', label: 'TRUE OR FALSE' },
    { value: '2', label: 'Fill in the blanks' },
    { value: '3', label: 'Multiple-choice' },
  ];

  const getMajorsOptions = async () => {
    await axios
      .get(`${USER_SERVER}/specialization`)
      .then((response) => {
        if (response.data) {
          const data = response.data.data.data;
          let options = data.map((courses) => ({
            value: courses._id,
            label: courses.specName,
          }));

          setOptionsSelectMajor(options);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  React.useEffect(() => {
    if (user.userData && user.userData.specialization) {
      setSuccessSelectMajor({
        value: `${user.userData.specialization._id}`,
        label: `${user.userData.specialization.specName}`,
      });
    }
  }, [user.userData]);
  const onMouseUp = () => {
    setSelectedWord(window.getSelection().toString());
  };

  const getCoursesOptions = async () => {
    if (successSelectMajor) {
      await axios
        .get(
          `${USER_SERVER}/courses?specialization=${successSelectMajor.value}`
        )
        .then((response) => {
          if (response.data) {
            const data = response.data.data.data;
            let options = data.map((item) => ({
              value: item._id,
              label: item.name,
            }));
            setOptionsCourses(options);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const getChaptersOptions = async () => {
    if (successSelectCourse) {
      await axios
        .get(
          `http://localhost:5000/api/v1/chapter?course=${successSelectCourse.value}`,
          { withCredentials: true }
        )
        .then((response) => {
          if (response.data) {
            const data = response.data.data.data;
            let options = data.map((chapter) => ({
              value: chapter._id,
              label: chapter.name,
            }));

            setOptionsChapter(options);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  ////
  const allQuestionsfun = async () => {
    if (successSelectCourse) {
      let q = [];

      await axios
        .get(
          `http://localhost:5000/api/v1/question?course=${successSelectCourse.value}`,
          { withCredentials: true }
        )
        .then((res) => {
          res.data.data.map(async (i, x) => {
            q = [...q, { question: i.question, id: i._id }];
          });

          setAllQuestions(q);
        });
    }
  };

  const clearFuntion = () => {
    setUpdateFlag(false);
    setSuccessSelectChapter('');
    setQuestion('');
    setSuccessSelect(null);
    setWrong1('');
    setWrong2('');
    setWrong3('');
    setAnswer('');
    setAFlagBlank(false);
    setAns(false);
    successSelectCourse('');
  };

  const selecedQuestion = () => {
    axios
      .get(`http://localhost:5000/api/v1/question/${searQust}`, {
        withCredentials: true,
      })
      .then((res) => {
        axios
          .get(
            `http://localhost:5000/api/v1/chapter/${res.data.data.chapter}`,
            { withCredentials: true }
          )
          .then((res) => {
            setSuccessSelectChapter({
              label: res.data.data.name,
              id: res.data.data._id,
            });
          });
        // setQuestion(res.data.data.question);
        setQuestion(res.data.data.question);
        if (res.data.data.Type == 'Multiple-choice') {
          setSuccessSelect({ label: res.data.data.Type, value: 3 });
          setWrong1(res.data.data.incurrectAnswerArray[0]);
          setWrong2(res.data.data.incurrectAnswerArray[1]);
          setWrong3(res.data.data.incurrectAnswerArray[2]);
          setAnswer(res.data.data.Answer);
        } else if (res.data.data.Type == 'Fill in the blanks') {
          setSuccessSelect({ label: res.data.data.Type, value: 2 });
          setAFlagBlank(true);
          setSelectedWord(res.data.data.Answer);
          setWrong1(res.data.data.incurrectAnswerArray[0]);
          setWrong2(res.data.data.incurrectAnswerArray[1]);
          setWrong3(res.data.data.incurrectAnswerArray[2]);
          setAnswer(res.data.data.Answer);
        }
        if (res.data.data.Type == 'TRUE OR FALSE') {
          setSuccessSelect({ label: res.data.data.Type, value: 1 });
          setAns(res.data.data.Answer);
        }
      });
  };
  // console.log(updateFlag)
  console.log(value);

  React.useEffect(() => {
    getCoursesOptions();
  }, [successSelectMajor]);

  React.useEffect(() => {
    getMajorsOptions();
  }, []);

  React.useEffect(() => {
    selecedQuestion();
  }, [searQust]);

  React.useEffect(() => {
    allQuestionsfun();
    getChaptersOptions();
  }, [successSelectCourse]);
  return (
    <div>
      <Modal size="sm" isOpen={smallAlert} toggle={() => setSmallAlert(false)}>
        <div className="modal-header no-border-header">
          <button
            className="close"
            type="button"
            onClick={() => setSmallAlert(false)}
          >
            ×
          </button>
        </div>
        <div className="modal-body text-center">
          <h5>Are you sure you want to Delete this Question?</h5>
        </div>
        <div className="modal-footer">
          <div className="left-side">
            <Button
              className="btn-link"
              color="success"
              type="button"
              onClick={() => setSmallAlert(false)}
            >
              Never mind
            </Button>
          </div>
          <div className="divider" />
          <div className="right-side">
            <Button
              className="btn-link"
              color="danger"
              type="button"
              onClick={() => {
                axios
                  .delete(`${USER_SERVER}/question/${searQust}`, {
                    withCredentials: true,
                  })
                  .then((res) => {
                    if (res.data.success) {
                      setSmallAlert(false);
                      setSelectedWord('');
                      setQuestion('');
                      setSuccessSelectChapter(null);
                      setAnswer('');
                      setAns(false);
                      setWrong1('');
                      setWrong2('');
                      setWrong3('');
                    }
                  });
                setAFlagBlank(false);
              }}
            >
              Yes
            </Button>
          </div>
        </div>
      </Modal>
      <Container>
        <Card>
          <CardHeader color="info">
            <h4
              className={classes.cardTitleWhite}
              // onMouseUp={onMouseUp}
            >
              Questions Maker
            </h4>
            {/* <p className={classes.cardCategoryWhite}>All Courses Available</p> */}
          </CardHeader>
          <Container style={{ height: 'auto' }}>
            <GridItem
              container
              direction="row-reverse"
              justify="center"
              alignItems="center"
            >
              {successSelectMajor &&
              successSelectCourse &&
              successSelectChapter ? (
                <small style={{ marginTop: '1rem' }}>
                  {`${successSelectMajor.label} > ${successSelectCourse.label} > ${successSelectChapter.label}`}
                </small>
              ) : successSelectMajor && successSelectCourse ? (
                <small style={{ marginTop: '1rem' }}>
                  {`${successSelectMajor.label} > ${successSelectCourse.label}`}
                </small>
              ) : successSelectMajor && !successSelectCourse ? (
                <small style={{ marginTop: '1rem' }}>
                  {`${successSelectMajor.label}`}
                </small>
              ) : null}
            </GridItem>
            {!successSelectMajor ? (
              <FormGroup style={{ paddingTop: '1rem' }}>
                <Select
                  className="react-select react-select-default"
                  classNamePrefix="react-select"
                  name="defaultSelect"
                  value={successSelectMajor}
                  onChange={(value) => setSuccessSelectMajor(value)}
                  options={optionsMajor}
                  placeholder="Choose Question Type"
                />
              </FormGroup>
            ) : (
              <>
                {!successSelectCourse ? (
                  <GridItem
                    container
                    direction="row-reverse"
                    justify="center"
                    alignItems="center"
                  >
                    {optionsCourses.map((item) => {
                      return (
                        <Button
                          className="btn-link mr-1"
                          color="success"
                          href="#pablo"
                          onClick={() => {
                            // allQuestionsfun();
                            setSuccessSelectCourse(item);
                          }}
                        >
                          {item.label}
                        </Button>
                      );
                    })}
                  </GridItem>
                ) : successSelectCourse ? (
                  ////////////////////////////////////////
                  <Container>
                    <GridItem
                      container
                      direction="row-reverse"
                      justify="center"
                      alignItems="center"
                    >
                      {allQuestions ? (
                        <div style={{ margin: '1rem' }}>
                          {
                            <Autocomplete
                              value={value}
                              onChange={(e, newValue) => {
                                if (newValue) {
                                  setUpdateFlag(true);
                                } else if (newValue === null) {
                                  setUpdateFlag(false);
                                  setSuccessSelectChapter('');
                                  setQuestion('');
                                  setSuccessSelect(null);
                                  setWrong1('');
                                  setWrong2('');
                                  setWrong3('');
                                  setAnswer('');
                                  setAFlagBlank(false);
                                  setAns(false);
                                }
                                if (typeof newValue === 'string') {
                                  setValue({
                                    question: newValue,
                                  });
                                } else if (newValue && newValue.inputValue) {
                                  // Create a new value from the user input

                                  setValue({
                                    question: newValue.inputValue,
                                  });
                                } else {
                                  setValue(newValue);
                                  if (newValue) {
                                    setSearQust(newValue.id);
                                  }
                                }
                              }}
                              filterOptions={(options, params) => {
                                const filtered = filter(options, params);

                                // Suggest the creation of a new value
                                if (params.inputValue !== '') {
                                  filtered.push({
                                    inputValue: params.inputValue,
                                    question: `Add "${params.inputValue}"`,
                                  });
                                }

                                return filtered;
                              }}
                              selectOnFocus
                              clearOnBlur
                              handleHomeEndKeys
                              options={allQuestions}
                              getOptionLabel={(option) => {
                                // Value selected with enter, right from the input
                                if (typeof option === 'string') {
                                  return option;
                                }
                                // Add "xxx" option created dynamically

                                if (option.inputValue) {
                                  return option.inputValue;
                                }
                                // Regular option
                                return option.question;
                              }}
                              renderOption={(option) => option.question}
                              style={{ width: 400 }}
                              freeSolo
                              renderInput={(params) => (
                                <TextField {...params} label="Search Bar" />
                              )}
                            />
                          }
                        </div>
                      ) : null}
                    </GridItem>
                    <hr />

                    <GridItem
                      container
                      direction="row-reverse"
                      justify="center"
                      alignItems="center"
                    >
                      {optionsChapter.map((item) => {
                        return (
                          <Button
                            className="btn-link mr-1"
                            color="success"
                            href="#pablo"
                            onClick={() => {
                              setUpdateFlag(false);
                              setSuccessSelectChapter('');
                              setQuestion('');
                              setSuccessSelect(null);
                              setWrong1('');
                              setWrong2('');
                              setWrong3('');
                              setAnswer('');
                              setAFlagBlank(false);
                              setAns(false);
                              setSuccessSelectChapter(item);
                            }}
                          >
                            {item.label}
                          </Button>
                        );
                      })}
                    </GridItem>
                  </Container>
                ) : null}
                {successSelectChapter ? (
                  <>
                    <FormGroup style={{ paddingTop: '1rem', zIndex: '100' }}>
                      <Select
                        className="react-select react-select-default"
                        classNamePrefix="react-select"
                        name="defaultSelect"
                        value={successSelect}
                        onChange={(value) => setSuccessSelect(value)}
                        options={selectOptions}
                        placeholder="Choose Question Type"
                      />
                    </FormGroup>
                    {successSelect ? (
                      <FormGroup className="has-success">
                        <Input
                          className="form-control-success"
                          placeholder="Question ?"
                          id="inputSuccess"
                          type="text"
                          value={Question}
                          onChange={(e) => {
                            setQuestion(e.target.value);
                          }}
                        />
                      </FormGroup>
                    ) : null}
                    {successSelect ? (
                      successSelect.value == '1' ? (
                        <GridItem
                          container
                          direction="row-reverse"
                          justify="center"
                          alignItems="center"
                        >
                          <label
                            className="mr-1"
                            style={{ alignContent: 'center' }}
                          ></label>
                          <p>The Answer</p>
                          <GridItem
                            container
                            direction="row-reverse"
                            justify="center"
                            alignItems="center"
                          >
                            <Switch
                              defaultValue={ans}
                              offColor="success"
                              offText={
                                <i
                                  style={{ color: 'red' }}
                                  className="nc-icon nc-simple-remove"
                                />
                              }
                              onColor="success"
                              onText={<i className="nc-icon nc-check-2" />}
                              onChange={() => {
                                {
                                  ans ? setAns(false) : setAns(true);
                                }
                              }}
                            />
                          </GridItem>
                          {Question ? (
                            <GridItem
                              container
                              direction="row-reverse"
                              justify="center"
                              alignItems="center"
                            >
                              {!updateFlag ? (
                                <Button
                                  className="btn-round "
                                  color="success"
                                  outline
                                  type="button"
                                  style={{
                                    marginTop: '1rem',
                                    marginBottom: '1rem',
                                  }}
                                  onClick={() => {
                                    if (successSelect.value == '1') {
                                      axios
                                        .post(
                                          `${USER_SERVER}/question`,

                                          {
                                            Type: successSelect.label,
                                            question: Question,
                                            course: successSelectCourse.value,
                                            Answer: ans,
                                            chapter: successSelectChapter.value,
                                            CreatedBy: user.userData._id,
                                          },
                                          { withCredentials: true }
                                        )
                                        .then((res) => {
                                          if (res.data.success) {
                                            setSelectedWord('');
                                            setQuestion('');
                                            setSuccessSelectChapter(null);
                                            setAnswer('');
                                            setAns(false);
                                            setWrong1('');
                                            setWrong2('');
                                            setWrong3('');
                                            setAFlagBlank(false);
                                          }
                                        });
                                    }
                                  }}
                                >
                                  SUBMIT
                                </Button>
                              ) : (
                                <>
                                  <Button
                                    className="btn-round "
                                    color="danger"
                                    outline
                                    type="button"
                                    style={{
                                      marginTop: '1rem',
                                      marginBottom: '1rem',
                                      marginLeft: '1rem',
                                    }}
                                    onClick={() => {
                                      setSmallAlert(true);
                                    }}
                                  >
                                    DELETE
                                  </Button>

                                  <Button
                                    className="btn-round "
                                    color="warning"
                                    outline
                                    type="button"
                                    style={{
                                      marginTop: '1rem',
                                      marginBottom: '1rem',
                                      marginRight: '1rem',
                                    }}
                                    onClick={() => {
                                      if (successSelect.value == '1') {
                                        axios
                                          .put(
                                            `${USER_SERVER}/question/${searQust}`,

                                            {
                                              Type: successSelect.label,
                                              question: Question,
                                              course: successSelectCourse.value,
                                              Answer: ans,
                                              chapter:
                                                successSelectChapter.value,
                                              CreatedBy: user.userData._id,
                                            },
                                            { withCredentials: true }
                                          )
                                          .then((res) => {
                                            if (res.data.success) {
                                              setSelectedWord('');
                                              setQuestion('');
                                              setSuccessSelectChapter(null);
                                              setAnswer('');
                                              setAns(false);
                                              setWrong1('');
                                              setWrong2('');
                                              setWrong3('');
                                              setAFlagBlank(false);
                                            }
                                          });
                                      }
                                    }}
                                  >
                                    UPDATE
                                  </Button>
                                </>
                              )}
                            </GridItem>
                          ) : null}
                        </GridItem>
                      ) : successSelect.value == '2' ? (
                        <GridItem
                          container
                          direction="row-reverse"
                          justify="center"
                          alignItems="center"
                        >
                          {Question ? (
                            <h4 onMouseUp={onMouseUp}>{Question}</h4>
                          ) : null}
                          <GridItem
                            container
                            direction="row-reverse"
                            justify="center"
                            alignItems="center"
                          >
                            {selectedWord ? (
                              <GridItem
                                container
                                direction="row-reverse"
                                justify="center"
                                alignItems="center"
                              >
                                <h5
                                  style={{
                                    backgroundColor: '#f6f4e6',
                                    marginTop: '1rem',
                                  }}
                                  className="text-success"
                                >
                                  {Question
                                    ? 'The Answer: ' + selectedWord
                                    : null}
                                </h5>
                              </GridItem>
                            ) : null}
                            <GridContainer style={{ marginTop: '1rem' }}>
                              <GridItem xs={12} sm={12} md={4}>
                                <FormGroup className="has-danger">
                                  <Input
                                    className="form-control-danger"
                                    placeholder="wrong 1"
                                    id="inputSuccess"
                                    type="text"
                                    value={wrong1}
                                    onChange={(e) => {
                                      setWrong1(e.target.value);
                                    }}
                                  />
                                </FormGroup>
                              </GridItem>
                              <GridItem xs={12} sm={12} md={4}>
                                <FormGroup className="has-danger">
                                  <Input
                                    className="form-control-danger"
                                    placeholder="wrong 2"
                                    id="inputSuccess"
                                    type="text"
                                    value={wrong2}
                                    onChange={(e) => {
                                      setWrong2(e.target.value);
                                    }}
                                  />
                                </FormGroup>
                              </GridItem>
                              <GridItem xs={12} sm={12} md={4}>
                                <FormGroup className="has-danger">
                                  <Input
                                    className="form-control-danger"
                                    placeholder="wrong 3"
                                    id="inputSuccess"
                                    type="text"
                                    value={wrong3}
                                    onChange={(e) => {
                                      setWrong3(e.target.value);
                                    }}
                                  />
                                </FormGroup>
                              </GridItem>
                              <GridItem
                                container
                                direction="row-reverse"
                                justify="center"
                                alignItems="center"
                              >
                                <h4
                                  style={{
                                    backgroundColor: '#f6f4e6',
                                    marginTop: '1rem',
                                  }}
                                  className="text-success"
                                >
                                  {/* {answer} */}
                                </h4>
                              </GridItem>{' '}
                            </GridContainer>
                          </GridItem>
                          {selectedWord ? (
                            !flabBlank ? (
                              <Button
                                className="btn-link mr-1"
                                color="primary"
                                href="#pablo"
                                style={{
                                  marginTop: '1rem',
                                  marginBottom: '1rem',
                                }}
                                onClick={() => {
                                  let words = [];
                                  words = Question.split(' ');

                                  let slw = [];
                                  slw = selectedWord.split(' ');
                                  let sew = selectedWord.split(' ').join('');

                                  let x = '_';
                                  x = x.repeat(sew.length);
                                  let index;
                                  words.map((word, i) => {
                                    slw.map((selectWord) => {
                                      // selectWord = selectWord.replace(
                                      //   /\s+/g,
                                      //   ''
                                      // );

                                      if (selectWord == word) {
                                        let s = '';
                                        s = s.repeat(/\s+/g, '');
                                        if (!index) {
                                          index = i;
                                        }
                                        return (words[i] = s);
                                      }
                                    });
                                  });

                                  return (
                                    (words[index] = x),
                                    setQuestion(words.join(' ')),
                                    setAFlagBlank(true)
                                  );
                                }}
                              >
                                Create blank
                              </Button>
                            ) : flabBlank ? (
                              !updateFlag ? (
                                <Button
                                  className="btn-round "
                                  color="success"
                                  outline
                                  type="button"
                                  style={{
                                    marginTop: '1rem',
                                    marginBottom: '1rem',
                                  }}
                                  onClick={() => {
                                    if (successSelect.value == '2') {
                                      axios
                                        .post(
                                          `${USER_SERVER}/question`,

                                          {
                                            Type: successSelect.label,
                                            question: Question,
                                            Answer: selectedWord.toLowerCase(),
                                            course: successSelectCourse.value,
                                            incurrectAnswerArray: [
                                              wrong1,
                                              wrong2,
                                              wrong3,
                                            ],
                                            chapter: successSelectChapter.value,
                                            CreatedBy: user.userData._id,
                                          },
                                          { withCredentials: true }
                                        )
                                        .then((res) => {
                                          if (res.data.success) {
                                            setSelectedWord('');
                                            setQuestion('');
                                            setSuccessSelectChapter(null);
                                            setAnswer('');
                                            setAFlagBlank(false);
                                            setWrong1('');
                                            setWrong2('');
                                            setWrong3('');
                                          }
                                        });
                                    }
                                  }}
                                >
                                  SUBMIT
                                </Button>
                              ) : (
                                <>
                                  <Button
                                    className="btn-round "
                                    color="danger"
                                    outline
                                    type="button"
                                    style={{
                                      marginTop: '1rem',
                                      marginBottom: '1rem',
                                      marginLeft: '1rem',
                                    }}
                                    onClick={() => {
                                      setSmallAlert(true);
                                    }}
                                  >
                                    DELETE
                                  </Button>

                                  <Button
                                    className="btn-round "
                                    color="warning"
                                    outline
                                    type="button"
                                    style={{
                                      marginTop: '1rem',
                                      marginBottom: '1rem',
                                      marginRight: '1rem',
                                    }}
                                    onClick={() => {
                                      if (successSelect.value == '2') {
                                        axios
                                          .put(
                                            `${USER_SERVER}/question/${searQust}`,

                                            {
                                              Type: successSelect.label,
                                              question: Question,
                                              Answer: selectedWord.toLowerCase(),
                                              course: successSelectCourse.value,
                                              incurrectAnswerArray: [
                                                wrong1,
                                                wrong2,
                                                wrong3,
                                              ],
                                              chapter:
                                                successSelectChapter.value,
                                              CreatedBy: user.userData._id,
                                            },
                                            { withCredentials: true }
                                          )
                                          .then((res) => {
                                            if (res.data.success) {
                                              setSelectedWord('');
                                              setQuestion('');
                                              setSuccessSelectChapter(null);
                                              setAnswer('');
                                              setAFlagBlank(false);
                                              setWrong1('');
                                              setWrong2('');
                                              setWrong3('');
                                            }
                                          });
                                      }
                                    }}
                                  >
                                    UPDATE
                                  </Button>
                                </>
                              )
                            ) : null
                          ) : Question ? (
                            <small style={{ marginTop: '1rem' }}>
                              highlight the word you want to hide
                            </small>
                          ) : null}
                        </GridItem>
                      ) : (
                        <>
                          <GridContainer>
                            <GridItem
                              container
                              direction="row-reverse"
                              justify="center"
                              alignItems="center"
                            >
                              <h5
                                style={{
                                  backgroundColor: '#f6f4e6',
                                  marginTop: '1rem',
                                }}
                                className="text-success"
                              >
                                {Question ? Question : null}
                              </h5>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                              <FormGroup
                                style={{ marginTop: '2rem' }}
                                className="has-success"
                              >
                                <Input
                                  className="form-control-success"
                                  placeholder="The correct answer"
                                  id="inputSuccess"
                                  type="text"
                                  value={answer}
                                  onChange={(e) => {
                                    setAnswer(e.target.value);
                                  }}
                                />
                              </FormGroup>
                            </GridItem>
                          </GridContainer>

                          <GridContainer>
                            <GridItem xs={12} sm={12} md={4}>
                              <FormGroup className="has-danger">
                                <Input
                                  className="form-control-danger"
                                  placeholder="wrong 1"
                                  id="inputSuccess"
                                  type="text"
                                  value={wrong1}
                                  onChange={(e) => {
                                    setWrong1(e.target.value);
                                  }}
                                />
                              </FormGroup>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                              <FormGroup className="has-danger">
                                <Input
                                  className="form-control-danger"
                                  placeholder="wrong 2"
                                  id="inputSuccess"
                                  type="text"
                                  value={wrong2}
                                  onChange={(e) => {
                                    setWrong2(e.target.value);
                                  }}
                                />
                              </FormGroup>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                              <FormGroup className="has-danger">
                                <Input
                                  className="form-control-danger"
                                  placeholder="wrong 3"
                                  id="inputSuccess"
                                  type="text"
                                  value={wrong3}
                                  onChange={(e) => {
                                    setWrong3(e.target.value);
                                  }}
                                />
                              </FormGroup>
                            </GridItem>
                            <GridItem
                              container
                              direction="row-reverse"
                              justify="center"
                              alignItems="center"
                            ></GridItem>{' '}
                            <GridItem
                              container
                              direction="row-reverse"
                              justify="center"
                              alignItems="center"
                            >
                              {Question &&
                              answer &&
                              wrong1 &&
                              wrong2 &&
                              wrong3 ? (
                                !updateFlag ? (
                                  <Button
                                    className="btn-round "
                                    color="success"
                                    outline
                                    type="button"
                                    style={{
                                      marginTop: '1rem',
                                      marginBottom: '1rem',
                                    }}
                                    onClick={() => {
                                      if (successSelect.value == '3') {
                                        axios
                                          .post(
                                            `${USER_SERVER}/question`,

                                            {
                                              Type: successSelect.label,
                                              question: Question,
                                              Answer: answer.toLowerCase(),
                                              course: successSelectCourse.value,
                                              incurrectAnswerArray: [
                                                wrong1,
                                                wrong2,
                                                wrong3,
                                              ],
                                              chapter:
                                                successSelectChapter.value,
                                              CreatedBy: user.userData._id,
                                            },
                                            { withCredentials: true }
                                          )
                                          .then((res) => {
                                            if (res.data.success) {
                                              setSelectedWord('');
                                              setQuestion('');
                                              setSuccessSelectChapter(null);
                                              setAnswer('');
                                              setWrong1('');
                                              setWrong2('');
                                              setWrong3('');
                                            }
                                          });
                                      }
                                    }}
                                  >
                                    SUBMIT
                                  </Button>
                                ) : (
                                  <>
                                    <Button
                                      className="btn-round "
                                      color="danger"
                                      outline
                                      type="button"
                                      style={{
                                        marginTop: '1rem',
                                        marginBottom: '1rem',
                                        marginLeft: '1rem',
                                      }}
                                      onClick={() => {
                                        setSmallAlert(true);
                                      }}
                                    >
                                      DELETE
                                    </Button>

                                    <Button
                                      className="btn-round "
                                      color="warning"
                                      outline
                                      type="button"
                                      style={{
                                        marginTop: '1rem',
                                        marginBottom: '1rem',
                                        marginRight: '1rem',
                                      }}
                                      onClick={() => {
                                        if (successSelect.value == '3') {
                                          axios
                                            .put(
                                              `${USER_SERVER}/question/${searQust}`,

                                              {
                                                Type: successSelect.label,
                                                question: Question,
                                                Answer: answer.toLowerCase(),
                                                course:
                                                  successSelectCourse.value,
                                                incurrectAnswerArray: [
                                                  wrong1,
                                                  wrong2,
                                                  wrong3,
                                                ],
                                                chapter:
                                                  successSelectChapter.value,
                                                CreatedBy: user.userData._id,
                                              },
                                              { withCredentials: true }
                                            )
                                            .then((res) => {
                                              if (res.data.success) {
                                                setSelectedWord('');
                                                setQuestion('');
                                                setSuccessSelectChapter(null);
                                                setAnswer('');
                                                setWrong1('');
                                                setWrong2('');
                                                setWrong3('');
                                              }
                                            });
                                        }
                                      }}
                                    >
                                      UPDATE
                                    </Button>
                                  </>
                                )
                              ) : null}
                            </GridItem>
                          </GridContainer>
                        </>
                      )
                    ) : null}
                  </>
                ) : null}
              </>
            )}
          </Container>
        </Card>
      </Container>
    </div>
  );
}

export default QuestionsCreate;
