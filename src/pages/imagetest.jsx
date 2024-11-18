// ImageQualityAnalyzer.jsx
import React, { useState } from 'react';
import axios from 'axios';

const ImageAnalyzer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setAnalysis(null);
      setError(null);
    }
  };

  const analyzeImage = async () => {
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://localhost:3000/api/analyze-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setAnalysis(response.data);
      console.log(response.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Error analyzing image');
    } finally {
      setLoading(false);
    }
  };

  const renderQualityScore = (score) => {
    let color;
    if (score >= 50) color = '#28a745';
    else if (score >= 40) color = '#17a2b8';
    else if (score >= 30) color = '#ffc107';
    else if (score >= 20) color = '#fd7e14';
    else color = '#dc3545';

    return (
      <div style={{ color }}>
        <h3>{score}/100</h3>
        <p>{analysis.qualityRating}</p>
      </div>
    );
  };

  return (
    <div className="container">
      <h2>Image Quality Analyzer</h2>
      
      <div className="upload-section">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="file-input"
        />
        
        {preview && (
          <div className="preview">
            <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />
          </div>
        )}
        
        <button 
          onClick={analyzeImage} 
          disabled={!selectedFile || loading}
          className="analyze-button"
        >
          {loading ? 'Analyzing...' : 'Analyze Image'}
        </button>
      </div>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {analysis && (
        <div className="results">
          <h3>Analysis Results</h3>
          
          <div className="quality-score">
            {renderQualityScore(analysis.score)}
          </div>

          <div className="metrics">
            <h4>Technical Metrics</h4>
            <div className="metrics-grid">
              {Object.entries(analysis.details.technical.metrics).map(([key, value]) => (
                <div key={key} className="metric">
                  <span className="label">{key}:</span>
                  <span className="value">{typeof value === 'number' ? value.toFixed(2) : value}</span>
                </div>
              ))}
            </div>

            <h4>Color Analysis</h4>
            <div className="metrics-grid">
              {Object.entries(analysis.details.color.metrics).map(([key, value]) => (
                <div key={key} className="metric">
                  <span className="label">{key}:</span>
                  <span className="value">
                    {typeof value === 'object' ? value.overall?.toFixed(2) || value.quality?.toFixed(2) : value?.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <h4>Texture Analysis</h4>
            <div className="metrics-grid">
              {Object.entries(analysis.details.texture.metrics).map(([key, value]) => (
                <div key={key} className="metric">
                  <span className="label">{key}:</span>
                  <span className="value">{value.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="metadata">
            <h4>Image Information</h4>
            <p>Format: {analysis.metadata.format}</p>
            <p>Dimensions: {analysis.metadata.width} x {analysis.metadata.height}</p>
            <p>Size: {(analysis.metadata.size / 1024).toFixed(2)} KB</p>
          </div>
        </div>
      )}

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }

        .upload-section {
          margin: 20px 0;
          text-align: center;
        }

        .preview {
          margin: 20px 0;
        }

        .analyze-button {
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .analyze-button:disabled {
          background-color: #ccc;
        }

        .error {
          color: red;
          margin: 10px 0;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 10px;
          margin: 10px 0;
        }

        .metric {
          padding: 10px;
          background-color: #f8f9fa;
          border-radius: 4px;
        }

        .label {
          font-weight: bold;
        }

        .value {
          float: right;
        }
      `}</style>
    </div>
  );
};

export default ImageAnalyzer;