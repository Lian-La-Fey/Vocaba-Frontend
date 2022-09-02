import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createWord, updateWord } from "../../redux/features/wordSlice.js";
import Button from "../../components/Button/Button.js";
import Content from "../../components/Layouts/Content.js";
import StyledSelect from "../../components/Inputs/Select/StyledSelect.js";
import { filterArray } from "../../utilities/filterArrays.js";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import IconButton from "../../components/Button/IconButton/IconButton.js";
import { FaTimes, FaTrash, FaUpload } from "react-icons/fa";
import { Tab, Tabs } from "react-bootstrap";
import "./styles.css";
import ordinalNumbers from "../../utilities/ordinalNumbers.js";
import nextProgress from "../../utilities/calcNextProgress.js";
import Editor from "../../components/Editor/Editor.js";
import byteToUnit from "../../utilities/byteToUnit.js";

const initialState = {
  word: "",
  phonetic: "",
  pronunciation: "",
  partOfSpeech: "",
  clips: [],
  lists: [],
  user: "",
  definitions: [
    {
      definition: "",
      synonyms: [],
      antonyms: [],
      examples: "",
    },
  ],
};

const AddEditWord = () => {
  const { user } = useSelector((state) => ({ ...state.user }));
  const { words, loading } = useSelector((state) => ({ ...state.word }));
  const { addedWord } = useSelector((state) => ({ ...state.dictionaryWord }));
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const options = user?.lists.map((lName) => ({ value: lName, label: lName }));
  const [key, setKey] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState();

  const [wordData, setWordData] = useState({ ...initialState });
  const [videoUpload, setVideoUpload] = useState(null);

  const uploadVideo = (e) => {
    e.preventDefault();
    if (videoUpload === null) return;
    if (videoUpload.size > 3145728) {
      const _size = byteToUnit(videoUpload.size);
      toast.error(
        `
        Error uploading file: File is too big (${_size}).
        Max filesize: 3.0 MB`,
        { autoClose: 5000 }
      );
      return;
    }
    const clip = {
      uploadName: videoUpload.name,
      storageName: wordData.word + v4() + videoUpload.name,
      url: "",
    };
    const videoRef = ref(
      storage,
      `clips/${user._id}/words/${id}/${clip.storageName}`
    );
    uploadBytes(videoRef, videoUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        clip.url = url;
        setWordData((prev) => ({ ...prev, clips: [...prev.clips, clip] }));
      });
    });
    setVideoUpload(null);
  };

  const deleteClip = (e) => {
    e.preventDefault();
    const { name } = e.target;
    setWordData((prev) => ({
      ...prev,
      clips: prev.clips.filter((clip) => clip.storageName !== name),
    }));
  };

  useEffect(() => {
    if (id && words.length > 0) {
      const userWord = words.find((item) => item._id === id);
      setWordData(userWord);
      setSelectedOptions(
        options.filter((item) => userWord?.lists.includes(item.value))
      );
    }
    if (!id && window.location.href.includes("addWord")) {
      setWordData({
        ...initialState,
        ...addedWord,
      });
      setSelectedOptions();
    }
  }, [words, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const arr = selectedOptions?.map((item) => item.value);
    const updatedWordData = {
      ...wordData,
      definitions: wordData.definitions.map((def) => ({
        ...def,
        antonyms: def.antonyms.filter(filterArray),
        synonyms: def.synonyms.filter(filterArray),
        // examples: def.examples.filter(filterArray),
      })),
      lists: arr,
    };

    if (!id) {
      dispatch(
        createWord({ updatedWordData, userId: user._id, navigate, toast })
      );
    } else {
      const paths = window.location.pathname.split("/");
      if (paths[paths.length - 1] === "progress") nextProgress(updatedWordData);
      dispatch(updateWord({ id, updatedWordData, toast, navigate }));
    }
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setWordData({ ...wordData, [name]: value });
  };

  const handleArrays = (e) => {
    const { name, value } = e.target;
    setWordData((prev) => {
      let changedDef = { ...prev.definitions[key] };
      let definitions = [...prev.definitions];
      if (name === "synonyms" || name === "antonyms") {
        changedDef = { ...changedDef, [name]: value.split(",") };
        definitions[key] = changedDef;
      }
      return {
        ...prev,
        definitions: [...definitions],
      };
    });
  };

  const controlTab = (k) => {
    if (String(k) === String(wordData.definitions.length)) addNewDefinition();
    else setKey(k);
  };

  const addNewDefinition = () => {
    setWordData({
      ...wordData,
      definitions: [...wordData.definitions, initialState.definitions[0]],
    });
    setKey(wordData.definitions.length);
  };

  const deleteDefinition = () => {
    if (wordData.definitions.length > 1) {
      setWordData((prev) => {
        const arr = [...prev.definitions];
        arr.splice(key, 1);
        return { ...prev, definitions: arr };
      });
      setKey(0);
      return;
    }

    toast.error("At least one defintion is required", {
      autoClose: 3000,
      position: "bottom-center",
    });
    toast.clearWaitingQueue();
  };

  return (
    <Content>
      <div className="form-container">
        <h1 className="title">{id ? "Update Word" : "Add New Word"}</h1>
        <form className="contact-form row" onSubmit={handleSubmit}>
          <div className="form-field col-sm-4 pe-4">
            <input
              placeholder="Word"
              type="text"
              value={wordData.word}
              name="word"
              onChange={onInputChange}
              className="input-text"
            />
          </div>
          <div className="form-field col-6 col-sm-4 pe-4">
            <input
              placeholder="Part Of Speech"
              type="text"
              value={wordData.partOfSpeech}
              name="partOfSpeech"
              onChange={onInputChange}
              className="input-text"
            />
          </div>
          <div className="form-field col-6 col-sm-4 pe-4">
            <input
              placeholder="Phonetic"
              type="text"
              value={wordData.phonetic}
              name="phonetic"
              onChange={onInputChange}
              className="input-text"
            />
          </div>
          <div className="form-field col-md-12">
            <input
              placeholder="Pronunciation"
              type="text"
              value={wordData.pronunciation}
              name="pronunciation"
              onChange={onInputChange}
              className="input-text"
            />
          </div>
          <div className="p-2 col-md-12">
            <StyledSelect
              defaultValue={selectedOptions}
              value={selectedOptions}
              onChange={setSelectedOptions}
              options={options}
              isMulti
            />
          </div>
          <Tabs activeKey={key} onSelect={controlTab} className="my-4">
            {wordData.definitions.map((item, index) => (
              <Tab
                key={index}
                className="row"
                eventKey={index}
                title={`${ordinalNumbers(index)} Definition`}
              >
                <div className="form-field col-md-12">
                  <Editor
                    value={item.definition}
                    placeholder="Write examples line by line"
                    name="definition"
                    setWordData={setWordData}
                    index={key}
                  />
                  {!item.definition && (
                    <span style={{ left: "0" }} className="placeHolder">
                      Definition
                    </span>
                  )}
                </div>
                <div className="form-field col-sm-6 pe-4">
                  <input
                    name="synonyms"
                    value={item.synonyms}
                    className="input-text"
                    placeholder="Enter synonyms as syn1, syn2"
                    onChange={handleArrays}
                  />
                </div>
                <div className="form-field col-sm-6 pe-4">
                  <input
                    name="antonyms"
                    value={item.antonyms}
                    className="input-text"
                    placeholder="Enter antonyms as ant1, ant2"
                    onChange={handleArrays}
                  />
                </div>
                <div className="form-field col-lg-12" name="editor-examples">
                  <Editor
                    value={item.examples}
                    placeholder="Write examples line by line"
                    name="examples"
                    setWordData={setWordData}
                    index={key}
                  />
                  {!item.examples && (
                    <span style={{ left: "2rem" }} className="placeHolder">
                      Write Examples Line by
                    </span>
                  )}
                </div>
                <div className="d-flex justify-content-center">
                  <div className="delete-def" onClick={deleteDefinition}>
                    <FaTrash className="me-4"/>
                    <span>Delete Definition</span>
                  </div>
                </div>
              </Tab>
            ))}
            <Tab
              title={"New Definition..."}
              eventKey={wordData.definitions.length}
            ></Tab>
          </Tabs>
          {id && (
            <div className="form-field col-lg-12">
              <div className="boxWrapper">
                <input
                  type="file"
                  id="file"
                  className="inputfile"
                  onChange={(e) => {
                    setVideoUpload(e.target.files[0]);
                  }}
                />
                <label htmlFor="file">
                  {videoUpload ? (
                    <div
                      className="box"
                      onClick={(e) => {
                        uploadVideo(e);
                      }}
                    >
                      <FaUpload />
                      <span>Upload</span>
                    </div>
                  ) : (
                    <span className="box">Choose a clip&hellip;</span>
                  )}
                </label>
                {videoUpload && (
                  <div
                    className="box"
                    onClick={() => {
                      setVideoUpload(null);
                    }}
                  >
                    <FaTimes />
                    <span>Cancel</span>
                  </div>
                )}
              </div>
              <div className="clipWrapper">
                {wordData.clips.map((clip, index) => (
                  <div className="clip" key={clip + index}>
                    <p>{`${clip.uploadName}`}</p>
                    <IconButton onClick={deleteClip} name={clip.storageName}>
                      <FaTrash name={clip.storageName} />
                    </IconButton>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="form-field col-lg-12 d-flex justify-content-center">
            <Button style={{ width: "100%" }} type="submit" loading={loading}>
              {id ? "Update" : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </Content>
  );
};

export default AddEditWord;
