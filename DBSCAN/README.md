Clustering using the DBSCAN method, paired with PCA for dimensionality reduction

Pros :
  1. Can automatically detect outliers
  2. Can make clusters with irregular shapes

Cons :
  1. Output is very sensitive to the parameters
  2. High computational cost when dealing with large datasets
  3. Does not work well on clusters with varying densities
  4. Fine tuning the parameters takes a long time due to the intricacies of it

Steps on how to use DBSCAN method, along with PCA :
*You can look at the ipynb file for coding examples*
  1. Pick and choose a dataset
  2. Normalize the dataset, since PCA only works with numbers
  3. Apply PCA on the dataset
  4. Plot the PCA results using matplot
  5. Pick and choose however many components of PCA that you want, note that the acceptable
     percentage of explained variance can vary from dataset to dataset. If your dataset is large,
     consider using 80-90% of explained variance. Or you can just use all the components that has
     an eigenvalue of equal to or more than 1. Since any less than that means that the component
     does not represent the data very well.
  6. Apply the DBSCAN algorithm to your new dataset that has been modified by PCA, set the parameters
     of epsilon and minimum samples through trial and error. You might have to take a long while before
     you find a good value for the parameter to achieve good results. You can try to use a for loop and
     conditional statements to try out different combinations. 
  8. Combine both the resulting clustered dataset with your default one
  9. Plot the results however you please, use pairplot if you just want to see the clustering results
  10. Apply some validation methods on the final results (ex. Silhouette score, Davies-Bouldin, Calinski-Harabasz)
  11. If you achieve good results on the validation test, then you can proceed to do pattern analysis on the clusters
